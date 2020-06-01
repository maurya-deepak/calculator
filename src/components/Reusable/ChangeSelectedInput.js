export default function change(e, callback) {
  const clicked_element = e.target;
  
  const dropDownFirst = document.getElementById("item1");
  const dropDownSecond = document.getElementById("item2");
  const dropDownThird = document.getElementById("item3");
  
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
        callback(dropDownFirst);
      }
      if (clicked_element.id === "2") {
        callback(dropDownSecond);
      }
      if (clicked_element.id === "3") {
        callback(dropDownThird);
      }
    }
  }
}
