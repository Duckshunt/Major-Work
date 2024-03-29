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

// calculate the carbon consumption of the Ice car from various sources over 10 years
function IconsumptionCalc(car) {
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52

    //calculate the CO2 produced from the creating of the petrol the car uses
    consumption = car.ConsCombined / 100 // litres per km
    total_fuel = year_kms * consumption     //litres per year
    carbon_tons_fuel_10yr = 10 * total_fuel * 0.72 / 1000 //tons of carbon per 10 yrs

    //calculate the CO2 produced from the car's emissions
    emission = car.CO2Combined / 1000000 //tons of CO2 per km
    emission_10yr = emission * 10 * year_kms //tons of CO2 in 10 yrs
    total_carbon_tons_10yr = carbon_tons_fuel_10yr + emission_10yr
    return (Math.round(total_carbon_tons_10yr * 100) / 100)
}

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

// change the values of the tables to reflect the specific values for the cars
function displayResults(car1, car2, keys) {
    // calculating the consumption and cost of runnign for each car
    Iconsumption = IconsumptionCalc(car1)
    Iprice = carbonCost(car1, 'I')
    Econsumption = EconsumptionCalc(car2)
    Eprice = carbonCost(car2, 'E')

    document.getElementById("NameI").innerHTML = (`<a href=${car1.CarURL}>` + String(car1.Make) + ' ' + String(car1.Model) + '</a>')
    document.getElementById("NameE").innerHTML = (`<a href=${car2.CarURL}>` + String(car2.Make) + ' ' + String(car2.Model) + '</a>')
    document.getElementById("ImgI").innerHTML = `<img style="display:block; width:40vw; height:30vw; object-fit: cover;" src=${car1.ImageURL} alt="model" height=200 >`
    document.getElementById("ImgE").innerHTML = `<img style="display:block; width:40vw; height:30vw; object-fit: cover;" src=${car2.ImageURL} alt="model" height=200>`
    document.getElementById("PriceI").innerHTML = '$ ' + String(car1.Price) 
    document.getElementById("PriceE").innerHTML = '$ ' + String(car2.Price) 
    document.getElementById("CO2I").innerHTML = String(Iconsumption) 
    document.getElementById("CO2E").innerHTML = String(Econsumption) 
    document.getElementById("RunI").innerHTML = '$ ' + String(Iprice) 
    document.getElementById("RunE").innerHTML = '$ ' + String(Eprice) 
    document.getElementById("TotalI").innerHTML = '$ ' + String(Iprice+car1.Price) 
    document.getElementById("TotalE").innerHTML = '$ ' + String(Eprice+car2.Price) 
    document.getElementById("RangeE").innerHTML = String(car2.Range) +' km'
    

    co2_save = Math.round(Math.abs(Iconsumption-Econsumption) * 100) / 100
    document.getElementById("CO2_save").innerHTML = (`<b> You will save ${co2_save} tons of carbon 
    over 10 years by switching to this electric vehicle </b>`)

    price_diff = Math.abs((Iprice+car1.Price)-(Eprice+car2.Price))
    if ((Iprice+car1.Price) >= Eprice+car2.Price) {
        document.getElementById("price_comparison").innerHTML = (`<b> The electric vehicle will cost $ ${price_diff} less over the 10 years </b>`)
    }
    else {
        document.getElementById("price_comparison").innerHTML = (`<b> The electric vehicle will cost $ ${price_diff} more over the 10 years </b>`)
    }
    


    more_options = document.getElementById("more_options")
    if (keys.length == 1) {
        more_options.innerHTML = ''
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
    var range = Ecar.Range
    window.location.href = page + '?brand=' + pbrand +'&model=' + pmodel + '&kms=' + pkms + '&range=' + range// go to specified url
}

// get the selected data from the /data page which contains a json file with all the data sent from the server side
fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        Icar = out.selectedIcar
        Ecar = out.selectedEcar
        keys = out.sorted_array
        displayResults(Icar, Ecar, keys)

}).catch(err => console.error(err));