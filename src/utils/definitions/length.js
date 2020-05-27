const metric = {
  km: {
    name: {
      singular: "Kilometer",
      plural: "Kilometers",
    },
    to_anchor: 1000,
  },
  m: {
    name: {
      singular: "Meter",
      plural: "Meters",
    },
    to_anchor: 1,
  },
  dm: {
    name: {
      singular: "Decimeter",
      plural: "Decimeters",
    },
    to_anchor: 1 / 10,
  },
  cm: {
    name: {
      singular: "Centimeter",
      plural: "Centimeters",
    },
    to_anchor: 1 / 100,
  },
  mm: {
    name: {
      singular: "Millimeter",
      plural: "Millimeters",
    },
    to_anchor: 1 / 1000,
  },
  um: {
    // micrometer (denoting micro character as *u*)
    name: {
      singular: "Micrometer",
      plural: "Micrometers",
    },
    to_anchor: 1 / Math.pow(10, 6),
  },
  nm: {
    name: {
      singular: "Nanometer",
      plural: "Nanometers",
    },
    to_anchor: 1 / Math.pow(10, 9),
  },
  pm: {
    name: {
      singular: "Picometer",
      plural: "Picometers",
    },
    to_anchor: 1 / Math.pow(10, 12),
  },
};

const imperial = {
  in: {
    name: {
      singular: "Inch",
      plural: "Inches",
    },
    to_anchor: 1 / 12,
  },
  ft: {
    name: {
      singular: "Foot",
      plural: "Feet",
    },
    to_anchor: 1,
  },
  yd: {
    name: {
      singular: "Yard",
      plural: "Yards",
    },
    to_anchor: 3,
  },
  mi: {
    name: {
      singular: "Mile",
      plural: "Miles",
    },
    to_anchor: 5280,
  },
  nmi: {
    name: {
      singular: "Nautical mile",
      plural: "Nautical miles",
    },
    to_anchor: 6076.11549,
  },
  ftm: {
    name: {
      singular: "Fathom",
      plural: "Fathoms",
    },
    to_anchor: 6,
  },
};

const length = {
  metric,
  imperial,
  _anchors: {
    metric: {
      unit: "m",
      ratio: 1 / 0.3048,
    },
    imperial: {
      unit: "ft",
      ratio: 0.3048,
    },
  },
};

export default length;
