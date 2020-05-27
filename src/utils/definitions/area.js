const metric = {
  km2: {
    name: {
      singular: "Square Kilometer",
      plural: "Square Kilometers",
    },
    to_anchor: 1000000,
  },
  ha: {
    name: {
      singular: "Hectare",
      plural: "Hectares",
    },
    to_anchor: 10000,
  },
  m2: {
    name: {
      singular: "Square meter",
      plural: "Square meters",
    },
    to_anchor: 1,
  },
  dm2: {
    name: {
      singular: "Square decimeter",
      plural: "Square decimeters",
    },
    to_anchor: 1 / 100,
  },
  cm2: {
    name: {
      singular: "Square centimeter",
      plural: "Square centimeters",
    },
    to_anchor: 1 / 10000,
  },
  mm2: {
    name: {
      singular: "Square millimeter",
      plural: "Square millimeters",
    },
    to_anchor: 1 / 1000000,
  },
  um2: {
    name: {
      singular: "Square micron",
      plural: "Square microns",
    },
    to_anchor: 1 / Math.pow(10, 12),
  },
};

const imperial = {
  in2: {
    name: {
      singular: "Square inch",
      plural: "Square inches",
    },
    to_anchor: 1 / 144,
  },
  ft2: {
    name: {
      singular: "Square feet",
      plural: "Square foot",
    },
    to_anchor: 1,
  },
  yd2: {
    name: {
      singular: "Square yard",
      plural: "Square yards",
    },
    to_anchor: 9,
  },
  ac: {
    name: {
      singular: "Acre",
      plural: "Acres",
    },
    to_anchor: 43560,
  },
  mi2: {
    name: {
      singular: "Square mile",
      plural: "Square miles",
    },
    to_anchor: 27878400,
  },
};

const area = {
  metric,
  imperial,
  _anchors: {
    metric: {
      unit: "m2",
      ratio: 10.7639,
    },
    imperial: {
      unit: "ft2",
      ratio: 1 / 10.7639,
    },
  },
};

export default area;
