
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
var brands_list = {

}
var Ice_model_list = {
    
}
var Ice_brands_list = {

}
//console.log(model_list)


function changecat(value) {
    var catOptions = "<option disabled>Select a model</option>";
    for (categoryId in Ice_model_list[value]) {
        catOptions += "<option>" + Ice_model_list[value][categoryId] + "</option>";
    }
    document.getElementById("models").innerHTML = catOptions;
    
}


function displayCars() {
    var n = brands_list
    var elem = document.getElementById("test")
    var string = '';
    for (let i = 0; i < n.length; i++) {
        //console.log(Ice_model_list);
        //console.log(Ice_model_list[n[i]]);
        string += n[i] + ' ' + model_list[n[i]]+ ' ' + '<br></br>';
       
      }
    
    elem.innerHTML = string
}
function changepage(page) {
    var brand = document.getElementById("brands")
    var model = document.getElementById("models")
    var kms = document.getElementById("kms")
    bvalue = brand.value
    mvalue = model.value
    kvalue = kms.value
    window.location.href = page + '?brand=' + bvalue +'&model=' + mvalue + '&kms=' + kvalue
    
}

function displayValues() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params, 'parameters')
    var pbrand = params.brand
    var pmodel = params.model
    var pkms = params.kms
    var change = document.getElementById("change")
    change.innerHTML = pbrand + ' ' + pmodel + ' ' + pkms
}

function displayResults(car1, car2) {
    var text = document.getElementById("table")
    //text.innerhtml = car1.Price + car2.Price
}


fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        var x = document.getElementById("brands")
        var l = out.Ice_brands_list
        var m = out.Ice_model_list
        brands_list = out.brands_list
        var o = out.model_list

        //console.log(n[0])
        //console.log(out.selectedIcar.Price)
        //console.log(out.selectedEcar.Price)
        //console.log(o)
        //displayResults(out.selectedIcar, out.selectedEcar)
        Ice_model_list = Object.assign(Ice_model_list, m)
        //console.log(Ice_model_list)
        model_list = Object.assign(model_list, o)
       
        for (let i = 0; i < l.length; i++) {
            var c = document.createElement("option")
            
            c.text = l[i];
            v = l[i].replace(' ', '-')
            c.classList.add(v);
            x.options.add(c,i+1);
          }
        changecat(brands_list[0])
        
}).catch(err => console.error(err));

