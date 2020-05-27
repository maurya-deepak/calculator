import length from "./definitions/length";
import area from "./definitions/area";
import volume from './definitions/volume';

const measures = { length, area, volume };

class Converter {
    constructor(value, measure) {
        this.value = parseFloat(value);
        this.measure = measure;
    }
    getUnit(abbr) {
        let found;
        const currentMeasure = measures[this.measure];
        for (let [system, units] of Object.entries(currentMeasure)) {
            for (let [unitAbbr, unit] of Object.entries(units)) {
                if (unitAbbr === abbr) {
                    found = {
                        abbr: abbr,
                        measure: this.measure,
                        system: system,
                        unit: unit,
                    };
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        return found;
    }
    from(from) {
        if (this.destination) {
            return null;
        }
        this.source = this.getUnit(from);
        return this;
    }
    to(to) {
        if (!this.source) {
            return null;
        }
        this.destination = this.getUnit(to);
        let result;
        // Don't change the value if source and destination are same
        if (this.source.abbr === this.destination.abbr) {
            return this.value;
        }
        // measure should be same eg. you can't go from length to volume
        if (this.source.measure !== this.destination.measure) {
            return null;
        }
        // convert from the source value to its anchor inside the system
        result = this.value * this.source.unit.to_anchor;
        // convert from one system to another through anchor ratio eg. metric (km) to imperial (yd)
        if (this.source.system !== this.destination.system) {
            result *= measures[this.source.measure]._anchors[this.source.system].ratio;
        }
        /**  convert from its anchor to another unit
         * eg.Imperial anchor is ft => to convert to destination(like inch) divide by its anchor
         */
        return result / this.destination.unit.to_anchor;
    }
}

const convert = function (value, measure) {
  return new Converter(value, measure);
};




export { convert };

// console.log(convert("56", "length").from("mm").to("in")); // 2.20472441
// console.log(convert("8.62", "length").from("m").to("mi")); // 0.00535621968
// console.log(convert("4.58", "length").from("km").to("nmi")); // 2.47300216
// console.log(convert("86", "length").from("yd").to("nm")); // 7.86384e+10
// console.log(convert("7.69", "length").from("mm").to("ft")); // 0.0252296588
// console.log(convert("7.695869", "length").from("ft").to("in")); // 92.350428
// console.log(convert("84.23", "length").from("cm").to("mi")); // 0.000523380955
// console.log(convert("84.23", "length").from("ftm").to("km")); // 0.000523380955
