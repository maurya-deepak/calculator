export default function change(e, callback) {
  const clicked_element = e.target;
  const item1 = document.getElementById("item1");
  const item2 = document.getElementById("item2");
  const focused_element = document.querySelector(".current");

  if (
    focused_element &&
    clicked_element &&
    clicked_element !== focused_element
  ) {
    focused_element.className = "";
    clicked_element.className = "current";

    if (typeof callback === "function" && callback) {
      if (clicked_element.id === "1") {
        callback(item1);
      }
      if (clicked_element.id === "2") {
        callback(item2);
      }
    }
  }
}
