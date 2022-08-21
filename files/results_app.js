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
    console.log(carbon_tons_fuel_10yr, emission_10yr)
    return (Math.round(total_carbon_tons_10yr * 100) / 100)
}

function EconsumptionCalc(car){
    //get kms per week from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var kms = params.kms
    year_kms = parseInt(kms) * 52
    console.log(car.BatterySize,  car.Range )

    consumption = car.BatterySize / car.Range               //kwh per km
    emissions = 390                                          //g per kwh
    total_CO2 = emissions * consumption                       //g per km
    carbon_tons_10yr = total_CO2 * year_kms * 10 / 1000000      //tons of carbon used in 10 yrs
    console.log(carbon_tons_10yr, "ecar")
    return (Math.round(carbon_tons_10yr * 100) / 100)
}

function displayResults(car1, car2) {
    console.log(car1)
    var Icar = document.getElementById("Icar")
    var Ecar = document.getElementById("Ecar")
    //table.innerHTML = car1.Price car2.Price
    //Itable = ['Make', 'Model', 'Price', 'Type', 'Category']
    Iconsumption = IconsumptionCalc(car1)
    console.log(Iconsumption)
    Econsumption = EconsumptionCalc(car2)
    console.log(Econsumption)
    //Icar.innerHTML = displayString(Itable, car1)
    //console.log(String(car1.Make))
    Icar.innerHTML = ('Brand: ' + String(car1.Make) + '<br></br>' + 'Model: ' + String(car1.Model) + '<br></br>' + 'Price: ' + String(car1.Price) + '<br></br>' + 
    'Type: ' + String(car1.Type) + '<br></br>' + 'Category: ' + String(car1.Category) + '<br></br>' + 'CO2 tons per 10 yrs: ' + Iconsumption + '<br></br>')
    Ecar.innerHTML = ('Brand: ' + String(car2.Make) + '<br></br>' + 'Model: ' + String(car2.Model) + '<br></br>' + 'Price: ' + String(car2.Price) + '<br></br>' + 
    'Type: ' + String(car2.Type) + '<br></br>' + 'Category: ' + String(car2.Category) + '<br></br>' + 'CO2 tons per 10 yrs: ' + Econsumption + '<br></br>') 
}





fetch('/data')
    .then(res => res.json())
    .then((out) => {
        
        Icar = out.selectedIcar
        Ecar = out.selectedEcar
        //console.log(Icar.Price)

        displayResults(Icar, Ecar)
        
        
}).catch(err => console.error(err));