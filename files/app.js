
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

var model_list = {
    
}
console.log(model_list)


function changecat(value) {
    if (value.length == 0) document.getElementById("models").innerHTML = "<option></option>";
    else {
        var catOptions = "<option disabled>Select a model</option>";
        for (categoryId in model_list[value]) {
            catOptions += "<option>" + model_list[value][categoryId] + "</option>";
        }
        document.getElementById("models").innerHTML = catOptions;
    }
}



fetch('http://localhost:3000/data')
    .then(res => res.json())
    .then((out) => {
        //console.log('Output: ', out);
        //console.log(out.brands_list)
        //console.log(typeof(out))
        var x = document.getElementById("brands")
        var l = out.brands_list
        var m = out.model_list
        //console.log(out.model_list)
        //console.log(m)
        model_list = Object.assign(model_list, m)
        //console.log(model_list)
        //const obj = JSON.parse(l)
        //console.log(l)
        //console.log(obj, 'Object')
        //console.log(Object.values(l))
        //console.log(l[2])
        for (let i = 0; i < l.length; i++) {
            var c = document.createElement("option")
            //console.log(l[i])
            c.text = l[i];
            v = l[i].replace(' ', '-')
            c.classList.add(v);
            x.options.add(c,i+1);
          }
        changecat("Audi")
}).catch(err => console.error(err));

