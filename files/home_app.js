var element = document.body;

// get theme from local storage and load current theme
var theme = localStorage.getItem('theme')
x = document.getElementById("change-icon")
function page_load(){
    if (theme != "light-mode"){
        theme_load()
    }
  }

// load current theme
function theme_load(){
    x.classList.toggle("fa-sun");
    element.classList.toggle("dark-mode");
}
 
// change theme
function theme_change() {
    if (theme == "light-mode") {
        x.classList.toggle("fa-sun");
        element.classList.toggle("dark-mode");
        theme = "dark-mode"
    } else { 
        x.classList.toggle("fa-sun");
        element.classList.toggle("dark-mode");
        theme = "light-mode"
    } 
  }
// check for change theme button pressed
window.addEventListener('unload', function(event) {
    localStorage.setItem('theme', theme);
})