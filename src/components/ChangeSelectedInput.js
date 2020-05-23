export default function change(e){
  const clicked_element = e.target;
  const focused_element = document.querySelector(".current");
  if (clicked_element !== focused_element) {
    focused_element.className = "";
    clicked_element.className = "current";
  }
};
