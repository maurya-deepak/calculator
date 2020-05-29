const daysInYear = 365.25;

const timeConversion = {
  ns: {
    name: {
      singular: "Nanosecond",
      plural: "Nanoseconds",
    },
    to_anchor: 1 / 1000000000,
  },
  ps: {
    name: {
      singular: "Picosecond",
      plural: "Picoseconds",
    },
    to_anchor: 1 / 1000000000000,
  },
  mu: {
    name: {
      singular: "Microsecond",
      plural: "Microseconds",
    },
    to_anchor: 1 / 1000000,
  },
  ms: {
    name: {
      singular: "Millisecond",
      plural: "Milliseconds",
    },
    to_anchor: 1 / 1000,
  },
  s: {
    name: {
      singular: "Second",
      plural: "Seconds",
    },
    to_anchor: 1,
  },
  min: {
    name: {
      singular: "Minute",
      plural: "Minutes",
    },
    to_anchor: 60,
  },
  h: {
    name: {
      singular: "Hour",
      plural: "Hours",
    },
    to_anchor: 60 * 60,
  },
  d: {
    name: {
      singular: "Day",
      plural: "Days",
    },
    to_anchor: 60 * 60 * 24,
  },
  wk: {
    name: {
      singular: "Week",
      plural: "Weeks",
    },
    to_anchor: 60 * 60 * 24 * 7,
  },
  m: {
    name: {
      singular: "Month",
      plural: "Months",
    },
    to_anchor: (60 * 60 * 24 * daysInYear) / 12,
  },
  y: {
    name: {
      singular: "Year",
      plural: "Years",
    },
    to_anchor: 60 * 60 * 24 * daysInYear,
  },
};

const time = {
  metric: timeConversion,
  _anchors: {
    metric: {
      unit: "s",
      ratio: 1,
    },
  },
};

export default time;
