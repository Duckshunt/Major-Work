
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
var Ice_model_list = {
    
}
var Ice_brands_list = {

}
//console.log(model_list)


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

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params, 'parameters')
var pbrand = params.brands
var pmodel = params.models
var change = document.getElementById("change")
change.innerHTML = pbrand + ' ' + pmodel
/*
var brand = document.getElementById("brands")
console.log(brand, 'list')
var selected_brand = document.getElementsByClassName(pbrand)
console.log(selected_brand)
//console.log(selected_brand, params.brand)
selected_brand.selected = true
*/
function displayIceCars() {
    var n = Ice_brands_list
    var elem = document.getElementById("test")
    for (let i = 0; i < n.length; i++) {
        console.log(Ice_model_list);
        console.log(Ice_model_list[n][i]);
        elem.innerHTML = n[i] + ' ' + Ice_model_list[n[i]];
        /*
        for (let j = 0; j < Ice_model_list[n].length; i++) {
            elem.innerHTML = n[i] + ' ' + Ice_model_list[n[i]];
        }
        */
      }
    //elem.innerHTML = n[0] + ' ' + Ice_model_list[n[0]]
}



fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        var x = document.getElementById("brands")
        var l = out.brands_list
        var m = out.model_list
        Ice_brands_list = out.Ice_brands_list
        var o = out.Ice_model_list

        //console.log(n[0])
        //console.log(o)

        model_list = Object.assign(model_list, m)
        Ice_model_list = Object.assign(Ice_model_list, o)
       
        for (let i = 0; i < l.length; i++) {
            var c = document.createElement("option")
            
            c.text = l[i];
            v = l[i].replace(' ', '-')
            c.classList.add(v);
            x.options.add(c,i+1);
          }
        changecat("Audi")
}).catch(err => console.error(err));

