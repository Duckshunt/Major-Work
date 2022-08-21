const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const async = require('async');

app.use(bodyParser.urlencoded({extended: false}))


mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/cars")


const EcarSchema = {
    Make: String,
    Model: String,
    BatterySize: Number,
    Range: Number,
    Price: Number,
    Type: String,
    Category: String,
    ImageURL: String,
    CarURL: String
}

const IcecarSchema = {
    Make: String,
    Model: String,
    ConsCombined: Number,
    CO2Combined: Number,
    Price: Number,
    Type: String,
    Category: String,
    ImageURL: String,
    CarURL: String
}


//const ECar = mongoose.model("electric_car", EcarSchema)
//const IceCar = mongoose.model("ICE_car", IcecarSchema)
const ECar = mongoose.model("final_electric_cars", EcarSchema)
const IceCar = mongoose.model("final_ice_cars", IcecarSchema)

var brands_list = []
var model_list = {}

var Ice_brands_list = []
var Ice_model_list = {}

let completeECars = []
let completeIceCars = []


app.use(express.static("files"))

app.use(bodyParser.json())

// define the first route
app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")

})

app.get("/home.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")

})

app.get("/find_car.html", function (req, res) {
 
    var query = ECar.distinct('Make');
    var Ice_query = IceCar.distinct('Make');
    

    query.exec(function(err,car){
        if (err) return err
        for (let i = 0; i < car.length; i++) {
            if (!brands_list.includes(car[i])) {
                brands_list.push(car[i])
              }
          }

    })
    Ice_query.exec(function(err,car){
        if (err) return err
        for (let i = 0; i < car.length; i++) {
            if (!Ice_brands_list.includes(car[i])) {
                Ice_brands_list.push(car[i])
              }
          }

    })
    var model_query = ECar.find({}).select({Make:1, Model:1, _id:0});
    model_query.exec(function(err,models){
        if (err) return err
        for (let i = 0; i < models.length; i++) {
            x = models[i].Make
            y = models[i].Model
            if (!model_list[x]) {
                model_list[x] = [];
                
            }
            if (!model_list[x].includes(y)) {
                model_list[x].push(y)
            }
            
        }
        //console.log(model_list)
    })
    var Ice_model_query = IceCar.find({}).select({Make:1, Model:1, _id:0});
    Ice_model_query.exec(function(err,models){
        if (err) return err
        for (let i = 0; i < models.length; i++) {
            x = models[i].Make
            y = models[i].Model
            if (!Ice_model_list[x]) {
                Ice_model_list[x] = [];
                
            }
            if (!Ice_model_list[x].includes(y)) {
                Ice_model_list[x].push(y)
            }
            
        }
        //console.log(Ice_model_list)
    })
    res.sendFile(__dirname + "/html/find_car.html")
})

// fetch the data from the database when the page loads and send it to the client side in a json file
app.get("/data", function(req,res){
    res.json({brands_list, model_list, Ice_brands_list, Ice_model_list, selectedIcar, selectedEcar})
 
})

var selectedIcar
var selectedEcar


async function populateTables(brand, model, kms){
    //query ice table and get category, type and price of selected car
    
    
    var iquery = IceCar.find({Make:brand, Model:model}).select("-_id")
    iquery.exec(function(err,iceCars){
        if (err) return err
        itype = iceCars[0].Type
        icategory = iceCars[0].Category
        iprice = iceCars[0].Price
        var equery = ECar.find({Type:itype, Category:icategory}).select("-_id")
        equery.exec(function(err,eCars){ 
            if (err) return err
            selected = 0
            pdiff = Math.abs(iprice-eCars[0].Price)
            for (let i = 1; i < eCars.length; i++) {
                if (Math.abs(iprice-eCars[i].Price) < pdiff) {
                    selected = i
                }
            }
            console.log(iceCars[0])
            console.log(eCars[selected])
            selectedIcar = iceCars[0]
            selectedEcar = eCars[selected]

            //console.log(eCars)
            
        })
    })
}

function chooseEcar(brand, model, kms) {
    console.log('hi22')
    //console.log(completeECars[0], 'hi')
    //console.log(completeECars)
    for (let i = 0; i < completeECars.length; i++) {
        if (completeECars[i].Make == "Audi"){
            //console.log(completeECars[i])
        }
            
    }
    /*
    var equery = ECar.find({Make:"Audi"})
    equery.exec(function(err,result){
        if (err) return err
        console.log(result)
    })
    */
}

app.get("/results.html", async function (req, res) {
    //completeECars = {}
    //completeIceCars = {}
    qbrand = req.query.brand
    qmodel = req.query.model
    qkms = req.query.kms
    //console.log(qbrand, qmodel, qkms)

    populateTables(qbrand, qmodel, qkms)
    console.log(completeECars, 'hello')
    //chooseEcar(qbrand, qmodel, qkms)
    //chooseEcar(1,2,3)
    

    res.sendFile(__dirname + "/html/results.html")
})




// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

