export default function Reset(arrObj) {
  for (let i = 0; i < arrObj.length; i++) {
    let key = arrObj[i].name;
    this.setState({
      [key]: "0",
    });
  }
}
