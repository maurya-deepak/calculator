export default function change(e){
  const current_element = e.target;
  const current_id = document.getElementById("current");
  if (current_element !== current_id) {
    current_id.id = "";
    current_element.id = "current";
  }
};
