const km = {
  km: 1,
  m: 1000,
  dm: 10000,
  cm: 100000,
  mm: 1000000,
  mi: 0.621371192,
  ft: 3280.8399,
  in: 39370.0787,
};

const m = {};
const dm = {};
const cm = {};
const mm = {};
const mi = {};
const ft = {};
const inc = {};

const measures = [m, dm, cm, mm, mi, ft, inc];

const conversionValuesArr = [
  1000,
  10000,
  100000,
  1000000,
  0.621371192,
  3280.8399,
  39370.0787,
];

const convert = (key, value, obj) => {
  obj[key] = km[key] / value;
};

for (let k = 0; k < conversionValuesArr.length; k++) {
  Object.keys(km).map((element) => {
    return convert(element, conversionValuesArr[k], measures[k]);
  });
}

export const Conversion = {
  km: km,
  m: m,
  dm: dm,
  cm: cm,
  mm: mm,
  mi: mi,
  ft: ft,
  in: inc,
};
