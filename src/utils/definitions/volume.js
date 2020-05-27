const metric = {
  m3: {
    name: {
      singular: "Cubic meter",
      plural: "Cubic meters",
    },
    to_anchor: 1000,
  },
  dm3: {
    name: {
      singular: "Cubic decimeter",
      plural: "Cubic decimeter",
    },
    to_anchor: 1,
  },
  cm3: {
    name: {
      singular: "Cubic centimeter",
      plural: "Cubic centimeters",
    },
    to_anchor: 1 / 1000,
  },
  mm3: {
    name: {
      singular: "Cubic millimeter",
      plural: "Cubic millimeters",
    },
    to_anchor: 1 / 1000000,
  },
  l: {
    name: {
      singular: "Liter",
      plural: "Liters",
    },
    to_anchor: 1,
  },
  dl: {
    name: {
      singular: "Deciliter",
      plural: "Deciliters",
    },
    to_anchor: 1 / 10,
  },
  cl: {
    name: {
      singular: "Centiliter",
      plural: "Centiliters",
    },
    to_anchor: 1 / 100,
  },
  ml: {
    name: {
      singular: "Milliliter",
      plural: "Milliliters",
    },
    to_anchor: 1 / 1000,
  },
  hl: {
    name: {
      singular: "Hectoliter",
      plural: "Hectoliters",
    },
    to_anchor: 100,
  },
};

const volume = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "l",
      ratio: "1",
    },
  },
};

export default volume;
