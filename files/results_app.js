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
    //console.log(carbon_tons_fuel_10yr, emission_10yr)
    return (Math.round(total_carbon_tons_10yr * 100) / 100)
}

function EconsumptionCalc(car){
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52
    //console.log(car.BatterySize,  car.Range )

    consumption = car.BatterySize / car.Range               // kwh per km
    emissions = 390                                          // g per kwh
    total_CO2 = emissions * consumption                       // g per km
    carbon_tons_10yr = total_CO2 * year_kms * 10 / 1000000      // tons of carbon used in 10 yrs
    //console.log(carbon_tons_10yr, "ecar")
    return (Math.round(carbon_tons_10yr * 100) / 100)
}

function carbonCost(car, type) {
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52
    petrol_cost = 171.4     // cost of petrol at the time of making the program in cents per litre
    electricity_cost = 28.53    // cost per kwh in cents per kwh
    
    if (type == 'I') {
        consumption = car.ConsCombined / 100 // litres per km
        total_fuel_10yr = 10 * year_kms * consumption     //litres for 10 yrs
        fuel_cost_dollars = total_fuel_10yr * petrol_cost / 100
        return Math.round(fuel_cost_dollars)
    }
    else {
        consumption = car.BatterySize / car.Range       // kwh per km
        kwh_10yr = consumption * year_kms * 10          // kwh per 10 yrs
        electricity_cost_dollars = kwh_10yr * electricity_cost / 100
        return Math.round(electricity_cost_dollars)
    }
}

function displayResults(car1, car2) {
    //console.log(car1)
    var Icar = document.getElementById("Icar")
    var Ecar = document.getElementById("Ecar")
    Iconsumption = IconsumptionCalc(car1)
    Iprice = carbonCost(car1, 'I')
    Econsumption = EconsumptionCalc(car2)
    Eprice = carbonCost(car2, 'E')
    console.log(car1.ImageURL)
    document.getElementById("NameI").innerHTML = (`<a href=${car1.CarURL}>` + String(car1.Make) + ' ' + String(car1.Model) + '</a>')
    document.getElementById("NameE").innerHTML = (`<a href=${car2.CarURL}>` + String(car2.Make) + ' ' + String(car2.Model) + '</a>')
    document.getElementById("ImgI").innerHTML = `<img src=${car1.ImageURL} alt="model" height=200 >`
    document.getElementById("ImgE").innerHTML = `<img src=${car2.ImageURL} alt="model" height=200>`
    document.getElementById("PriceI").innerHTML = '$ ' + String(car1.Price) 
    document.getElementById("PriceE").innerHTML = '$ ' + String(car2.Price) 
    document.getElementById("CO2I").innerHTML = String(Iconsumption) 
    document.getElementById("CO2E").innerHTML = String(Econsumption) 
    document.getElementById("RunI").innerHTML = '$ ' + String(Iprice) 
    document.getElementById("RunE").innerHTML = '$ ' + String(Eprice) 
    document.getElementById("TotalI").innerHTML = '$ ' + String(Iprice+car1.Price) 
    document.getElementById("TotalE").innerHTML = '$ ' + String(Eprice+car2.Price) 
    
    
}





fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        Icar = out.selectedIcar
        Ecar = out.selectedEcar
        //console.log(Icar.Price)

        displayResults(Icar, Ecar)
        
        
}).catch(err => console.error(err));