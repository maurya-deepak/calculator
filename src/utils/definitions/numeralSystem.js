const numeralSystem = (number, from, convertTo) => {
  let res;
  let dec;
  switch (from) {
    case "DEC":
      res = conversion(parseInt(number, 10), convertTo);
      if (res !== null) return res;
      break;
    case "BIN":
      dec = parseInt(number, 2);
      res = conversion(dec, convertTo);
      if (res !== null) return res;
      break;
    case "OCT":
      dec = parseInt(number, 8);
      res = conversion(dec, convertTo);
      if (res !== null) return res;
      break;
    case "HEX":
      dec = parseInt(number, 16);
      res = conversion(dec, convertTo);
      if (res !== null) return res;
      break;
    default:
      break;
  }
};

const conversion = (number, convertTo) => {
  switch (convertTo) {
    case "DEC":
      return number;
    case "BIN":
      return number.toString(2);
    case "OCT":
      return number.toString(8);
    case "HEX":
      return number.toString(16);
    default:
      return null;
  }
};

export default numeralSystem;
