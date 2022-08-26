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

// stop the user from inputting values that aren't numbers in the input
const input = document.querySelector('input')
input.onkeypress = (evt) => {
  const charCode = evt.keyCode;
  if (charCode != 46 && charCode > 31 &&
    (charCode < 48 || charCode > 57)) {
    evt.preventDefault()
  }
}

// defining the lists
var model_list = {
    
}
var brands_list = {

}
var Ice_model_list = {
    
}
var Ice_brands_list = {

}

// change the options in the model list based on the current selected car
function changecat(value) {
    var catOptions = "<option disabled>Select a model</option>";
    for (categoryId in Ice_model_list[value]) {
        catOptions += "<option>" + Ice_model_list[value][categoryId] + "</option>";
    }
    document.getElementById("models").innerHTML = catOptions;
    
}

// change the page to the specified address while adding the brand, model and kms to the url
function changepage(page) {
    var brand = document.getElementById("brands")
    var model = document.getElementById("models")
    var kms = document.getElementById("kms")
    bvalue = brand.value
    mvalue = model.value
    if (kms.innerHTML == ""){
        kvalue = 0
    }
    else{
        kvalue = kms.value
    }
    window.location.href = page + '?brand=' + bvalue +'&model=' + mvalue + '&kms=' + kvalue
    
}


// get the selected data from the /data page which contains a json file with all the data sent from the server side
fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        // define temporary variables
        var x = document.getElementById("brands")
        var l = out.Ice_brands_list
        var m = out.Ice_model_list
        brands_list = out.brands_list
        var o = out.model_list

        // populate the model lists with the car's objects
        Ice_model_list = Object.assign(Ice_model_list, m)
        model_list = Object.assign(model_list, o)
       
        x.innerHTML = "<option disabled>Select a brand</option>"
        // assign the values in the brands dropdown from the brands list
        for (let i = 0; i < l.length; i++) {
            var c = document.createElement("option")
            
            c.text = l[i];
            v = l[i].replace(' ', '-') // replace any unwanted characters in the string
            c.classList.add(v);
            x.options.add(c,i+1);   // add option to list
          }
        changecat(brands_list[0])   // populate the models list
        
}).catch(err => console.error(err));

