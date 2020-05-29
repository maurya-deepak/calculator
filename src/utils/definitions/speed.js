const metric = {
  c: {
    name: {
      singular: "Light speed",
      plural: "Light speed",
    },
    to_anchor: 1079252848.8,
  },
  Ma: {
    name: {
      singular: "Mach",
      plural: "Mach",
    },
    to_anchor: 1234.8,
  },
  "m/s": {
    name: {
      singular: "Metre per second",
      plural: "Metres per second",
    },
    to_anchor: 3.6,
  },
  "km/h": {
    name: {
      singular: "Kilometre per hour",
      plural: "Kilometres per hour",
    },
    to_anchor: 1,
  },
  "km/s": {
    name: {
      singular: "Kilometer per second",
      plural: "Kilometers per second",
    },
    to_anchor: 3600,
  },
};

const imperial = {
  "m/h": {
    name: {
      singular: "Mile per hour",
      plural: "Miles per hour",
    },
    to_anchor: 1,
  },
  kn: {
    name: {
      singular: "Knot",
      plural: "Knots",
    },
    to_anchor: 1.150779,
  },
  "ft/s": {
    name: {
      singular: "Foot per second",
      plural: "Feet per second",
    },
    to_anchor: 0.681818,
  },
  "in/s": {
    name: {
      singular: "Inch per second",
      plural: "Inches per second",
    },
    to_anchor: 1 / 17.6,
  },
};

const speed = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "km/h",
      ratio: 1 / 1.609344,
    },
    imperial: {
      unit: "m/h",
      ratio: 1.609344,
    },
  },
};

export default speed;
