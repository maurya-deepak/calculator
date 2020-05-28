const metric = {
  t: {
    name: {
      singular: "Tonne",
      plural: "Tonnes",
    },
    to_anchor: 1000000,
  },
  q: {
    name: {
      singular: "Quintal",
      plural: "Quintals",
    },
    to_anchor: 100000,
  },
  kg: {
    name: {
      singular: "Kilogram",
      plural: "Kilograms",
    },
    to_anchor: 1000,
  },
  g: {
    name: {
      singular: "Gram",
      plural: "Grams",
    },
    to_anchor: 1,
  },
  mg: {
    name: {
      singular: "Milligram",
      plural: "Milligrams",
    },
    to_anchor: 1 / 1000,
  },
  ug: {
    name: {
      singular: "Microgram",
      plural: "Micrograms",
    },
    to_anchor: 1 / 1000000,
  },
  ct: {
    name: {
      singular: "Carat",
      plural: "Carats",
    },
    to_anchor: 1 / 5,
  },
};

const imperial = {
  "l.t": {
    name: {
      singular: "Long ton",
      plural: "Long tons",
    },
    to_anchor: 2240,
  },
  "s.t": {
    name: {
      singular: "Short ton",
      plural: "Short tons",
    },
    to_anchor: 2000,
  },
  "l-cwt": {
    name: {
      singular: "UK hundredweight (long)",
      plural: "UK hundredweights (long)",
    },
    to_anchor: 112,
  },
  "s-cwt": {
    name: {
      singular: "US hundredweight (short)",
      plural: "US hundredweights (short)",
    },
    to_anchor: 100,
  },
  st: {
    name: {
      singular: "Stone",
      plural: "Stones",
    },
    to_anchor: 14,
  },
  lb: {
    name: {
      singular: "Pound",
      plural: "Pounds",
    },
    to_anchor: 1,
  },
  oz: {
    name: {
      singular: "Ounce",
      plural: "Ounces",
    },
    to_anchor: 1 / 16,
  },
  dr: {
    name: {
      singular: "Dram",
      plural: "Drams",
    },
    to_anchor: 1 / 256,
  },
  gr: {
    name: {
      singular: "Grain",
      plural: "Grains",
    },
    to_anchor: 1 / 7000,
  },
};

const mass = {
  metric,
  imperial,
  _anchors: {
    metric: {
      unit: "g",
      ratio: 1 / 453.59237,
    },
    imperial: {
      unit: "lb",
      ratio: 453.59237,
    },
  },
};

export default mass;
