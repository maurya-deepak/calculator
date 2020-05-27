const metric = {
  C: {
    name: {
      singular: "Degree Celsius",
      plural: "Degrees Celsius",
    },
    to_anchor: 1,
    anchor_shift: 0,
  },
  K: {
    name: {
      singular: "Degree Kelvin",
      plural: "Degrees Kelvin",
    },
    to_anchor: 1,
    anchor_shift: 273.15,
  },
};

const imperial = {
  F: {
    name: {
      singular: "Degree Fahrenheit",
      plural: "Degrees Fahrenheit",
    },
    to_anchor: 1,
  },
  R: {
    name: {
      singular: "Degree Rankine",
      plural: "Degrees Rankine",
    },
    to_anchor: 1,
    anchor_shift: 459.67,
  },
};

const temperature = {
  metric,
  imperial,
  _anchors: {
    metric: {
      unit: "C",
      transform: (celsius) => {
        return celsius / (5 / 9) + 32;
      },
    },
    imperial: {
      unit: "F",
      transform: (fahrenheit) => {
        return (fahrenheit - 32) * (5 / 9);
      },
    },
  },
};

export default temperature;
