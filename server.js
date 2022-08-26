// load the required modules to run the program
const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const async = require('async');

// connect to the mongodb database
app.use(bodyParser.urlencoded({extended: false}))
mongoose.connect("mongodb+srv://website-user:3WJA1Kq2L9BlKIrY@data.dvfjsbk.mongodb.net/cars")

// create the schemas for the results of the queries to the database, one for e car and one for ice car 
// this defines the expected results from the database query and must match the info entered in the database
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


// define models for each car based on the schema and the collection they are in
const ECar = mongoose.model("final_electric_cars", EcarSchema)
const IceCar = mongoose.model("final_ice_cars", IcecarSchema)

// define the lists 
var brands_list = []
var model_list = {}

var Ice_brands_list = []
var Ice_model_list = {}

let completeECars = []
let completeIceCars = []



app.use(express.static("files"))    // telling the website to pull its files from the 'files' folder

app.use(bodyParser.json())

// define the first route the user will see upon loading the project
app.get("/", function (req, res) {
     // construct the queries to each database based on the models we defined earlier
     var query = ECar.distinct('Make');  // only return the make/brand of the car
     var Ice_query = IceCar.distinct('Make');
     
     // execute the query to the database 
     query.exec(function(err,car){
         if (err) return err
         // populate the brand list with the result from the query
         for (let i = 0; i < car.length; i++) {
             if (!brands_list.includes(car[i])) {    // check if its in list already, if not add it to list
                 brands_list.push(car[i])
               }
           }
 
     })
     // same as above
     Ice_query.exec(function(err,car){
         if (err) return err
         for (let i = 0; i < car.length; i++) {
             if (!Ice_brands_list.includes(car[i])) {
                 Ice_brands_list.push(car[i])
               }
           }
 
     })
     // define the query to the database to find the make/brand and the model of the e car, without the id
     var model_query = ECar.find({}).select({Make:1, Model:1, _id:0});
     // execute the query
     model_query.exec(function(err,models){
         if (err) return err
         // populate lists with the result
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
     })
     // same as above but for Ice cars
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
     })
    res.sendFile(__dirname + "/html/home.html") // send the home page file to the user

})

// similar to above except when the user clicks on the home page 
// button in the navigation bar it will direct them to this get request instead
app.get("/home.html", function (req, res) {
    // construct the queries to each database based on the models we defined earlier
    var query = ECar.distinct('Make');  // only return the make/brand of the car
    var Ice_query = IceCar.distinct('Make');
    
    // execute the query to the database 
    query.exec(function(err,car){
        if (err) return err
        // populate the brand list with the result from the query
        for (let i = 0; i < car.length; i++) {
            if (!brands_list.includes(car[i])) {    // check if its in list already, if not add it to list
                brands_list.push(car[i])
              }
          }

    })
    // same as above
    Ice_query.exec(function(err,car){
        if (err) return err
        for (let i = 0; i < car.length; i++) {
            if (!Ice_brands_list.includes(car[i])) {
                Ice_brands_list.push(car[i])
              }
          }

    })
    // define the query to the database to find the make/brand and the model of the e car, without the id
    var model_query = ECar.find({}).select({Make:1, Model:1, _id:0});
    // execute the query
    model_query.exec(function(err,models){
        if (err) return err
        // populate lists with the result
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
    })
    // same as above but for Ice cars
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
    })
    res.sendFile(__dirname + "/html/home.html")

})

// when the user goes to the find car page
app.get("/find_car.html", function (req, res) {
 
    // construct the queries to each database based on the models we defined earlier
    var query = ECar.distinct('Make');  // only return the make/brand of the car
    var Ice_query = IceCar.distinct('Make');
    
    // execute the query to the database 
    query.exec(function(err,car){
        if (err) return err
        // populate the brand list with the result from the query
        for (let i = 0; i < car.length; i++) {
            if (!brands_list.includes(car[i])) {    // check if its in list already, if not add it to list
                brands_list.push(car[i])
              }
          }

    })
    // same as above
    Ice_query.exec(function(err,car){
        if (err) return err
        for (let i = 0; i < car.length; i++) {
            if (!Ice_brands_list.includes(car[i])) {
                Ice_brands_list.push(car[i])
              }
          }

    })
    // define the query to the database to find the make/brand and the model of the e car, without the id
    var model_query = ECar.find({}).select({Make:1, Model:1, _id:0});
    // execute the query
    model_query.exec(function(err,models){
        if (err) return err
        // populate lists with the result
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
    })
    // same as above but for Ice cars
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
    })
    
    res.sendFile(__dirname + "/html/find_car.html") // send the find car page to the user
})

// fetch the data from the database when the page loads and send it to the client side in a json file
app.get("/data", function(req,res){
    res.json({brands_list, model_list, Ice_brands_list, Ice_model_list, selectedIcar, selectedEcar, selectedEcars, sorted_array})
 
})

// returns the key of the object based on the value inputted
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

// provides a sorted list of the key values of the object in descending order based on value
// used to order the cars by price difference 
function sortDict(dict){
    key_array = Object.keys(dict)
    var temp_array = Object.values(dict)
    sorted_array = []
    temp_array.sort(function(a, b){return a - b});
    for (let i = 0; i < key_array.length; i++) {
        value = getKeyByValue(dict, temp_array[i])
        sorted_array.push(value)
    }
    return sorted_array
} 


// define variables
var selectedIcar
var selectedEcar
var selectedEcars
var sorted_array

// a function to get the information from the database about the cars 
// involved and populate the tables based on that
// defined as async, meaning asynchronous, so it can run while other things are running
async function populateTables(brand, model, kms){
    
    //query ice table and get category, type and price of selected car
    var iquery = IceCar.find({Make:brand, Model:model}).select("-_id")
    // execute the query
    iquery.exec(function(err,iceCars){
        if (err) return err
        itype = iceCars[0].Type
        icategory = iceCars[0].Category
        iprice = iceCars[0].Price
        // query the e car collection to find matching results
        var equery = ECar.find({Type:itype, Category:icategory}).select("-_id")
        equery.exec(function(err,eCars){ 
            if (err) return err
            // load all the selected cars into an object with their price
            select_dict = {}
            for (let i = 0; i < eCars.length; i++) {
                select_dict[i] = Math.abs(iprice-eCars[i].Price)

            }
            sorted_array = sortDict(select_dict)
            

            // set the selected cars based on the results
            selectedIcar = iceCars[0]
            selectedEcar = eCars[sorted_array[0]] // select the car with the closest price to the users current car
            selectedEcars = eCars
            
        })
    })
}

// another get request for the results page
app.get("/results.html", function (req, res) {
    // get the information from the queries in the URL
    qbrand = req.query.brand
    qmodel = req.query.model
    qkms = req.query.kms

    populateTables(qbrand, qmodel, qkms) // populate the tables before loading the page

    res.sendFile(__dirname + "/html/results.html") // send the page to the user
})

// get request for the more_options page
app.get("/more_options.html", function (req, res) {
    // get the information from the queries in the URL
    qbrand = req.query.brand
    qmodel = req.query.model
    qkms = req.query.kms

    populateTables(qbrand, qmodel, qkms) // populate the tables before loading the page


    res.sendFile(__dirname + "/html/more_options.html") // send the page to the user

})

app.get("/map.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/map.html") // send the page to the user

})




// start the server listening for requests
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
