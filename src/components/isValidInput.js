export default function isValidInput(inputValue){
    let valid = inputValue.split(".");
    if (valid[1] !== undefined) {
      valid = valid[1].length <= 1;
    }
    return valid;
}