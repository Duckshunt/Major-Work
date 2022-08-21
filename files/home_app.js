var element = document.body;

var theme = localStorage.getItem('theme')
x = document.getElementById("change-icon")
function page_load(){
    console.log(theme)
    if (theme != "light-mode"){
        theme_load()
    }
  }
function theme_load(){
    x.classList.toggle("fa-sun");
    element.classList.toggle("dark-mode");
}
 
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
window.addEventListener('unload', function(event) {
    localStorage.setItem('theme', theme);
    console.log(localStorage.getItem('theme'));
})