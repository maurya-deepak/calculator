export default function Backspace(obj, callback) {
  let key = obj.name;
  this.setState({
    [key]: this.state[key].length === 1 ? "0" : this.state[key].slice(0, -1),
  }, callback);
}
