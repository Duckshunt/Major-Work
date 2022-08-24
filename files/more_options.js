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

// calculate the consumption of the electric car from the energy used to power it
function EconsumptionCalc(car){
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52

    // calculating the carbon emitted by producing the energy to power the ev
    consumption = car.BatterySize / car.Range               // kwh per km
    emissions = 390                                          // g per kwh
    total_CO2 = emissions * consumption                       // g per km
    carbon_tons_10yr = total_CO2 * year_kms * 10 / 1000000      // tons of carbon used in 10 yrs
    return (Math.round(carbon_tons_10yr * 100) / 100)
}

// calculate the cost of using each type of car over the 10 year period
function carbonCost(car, type) {
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52
    petrol_cost = 171.4     // cost of petrol at the time of making the program in cents per litre
    electricity_cost = 28.53    // cost per kwh in cents per kwh at the time of making the program
    
    // if the car is an ICE car
    if (type == 'I') {
        consumption = car.ConsCombined / 100 // litres per km
        total_fuel_10yr = 10 * year_kms * consumption     //litres for 10 yrs
        fuel_cost_dollars = total_fuel_10yr * petrol_cost / 100
        return Math.round(fuel_cost_dollars)
    }
    // if the car is electric
    else {
        consumption = car.BatterySize / car.Range       // kwh per km
        kwh_10yr = consumption * year_kms * 10          // kwh per 10 yrs
        electricity_cost_dollars = kwh_10yr * electricity_cost / 100
        return Math.round(electricity_cost_dollars)
    }
}

function displayResults(car, keys) {
    header = document.getElementById("header")
    model = document.getElementById("model")
    img = document.getElementById("img")
    price = document.getElementById("price")
    CO2 = document.getElementById("CO2")
    run_cost = document.getElementById("run_cost")
    total_cost = document.getElementById("total_cost")
    range = document.getElementById("range")

    img_width = 90/(keys.length)
    

    for (let i = 0; i < keys.length; i++) {
        head1 = document.createElement("th")
        head1.innerHTML = `Option ${i+1}`
        header.appendChild(head1);

        model1 = document.createElement("td")
        model1.innerHTML = (`<a href=${car[keys[i]].CarURL}>` + String(car[keys[i]].Make) + ' ' + String(car[keys[i]].Model) + '</a>')
        model.appendChild(model1);

        img1 = document.createElement("td")
        img1.style = `${img_width}vw`
        img1.innerHTML = `<img style="display:block; width:${img_width}vw; height:${0.75*img_width}vw; object-fit: cover;" src=${car[keys[i]].ImageURL} alt="model" width=100%  >`
        img.appendChild(img1);

        price1 = document.createElement("td")
        price1.innerHTML = '$ ' + String(car[keys[i]].Price)
        price.appendChild(price1);

        CO21 = document.createElement("td")
        CO21.innerHTML = String(EconsumptionCalc(car[keys[i]]))
        CO2.appendChild(CO21);

        run_cost1 = document.createElement("td")
        run_cost1.innerHTML = '$ ' + String(carbonCost(car[keys[i]], 'E'))
        run_cost.appendChild(run_cost1);

        total_cost1 = document.createElement("td")
        total_cost1.innerHTML = '$ ' + String((carbonCost(car[keys[i]], 'E')+car[keys[i]].Price))
        total_cost.appendChild(total_cost1);
        
        range1 = document.createElement("td")
        range1.innerHTML = String(car[keys[i]].Range) + ' km'
        range.appendChild(range1);
    }
    
}

// change the page while inputting certain parameters into the url such as brand, model and kms
function changepage(page) {
    // get current parameters from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var pbrand = params.brand
    var pmodel = params.model
    var pkms = params.kms
    //console.log(page + '?brand=' + pbrand +'&model=' + pmodel + '&kms=' + pkms)
    window.location.href = page + '?brand=' + pbrand +'&model=' + pmodel + '&kms=' + pkms // go to specified url
}


// get the selected data from the /data page which contains a json file with all the data sent from the server side
fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        selectedEcars = out.selectedEcars
        sorted_array = out.sorted_array
        console.log(sorted_array)
        console.log(selectedEcars)
        displayResults(selectedEcars, sorted_array)

}).catch(err => console.error(err));