const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

//mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/notes")
mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/cars")
//mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/?retryWrites=true&w=majority")


const carSchema = {
    make: String,
    model: String,
    battery_size: Number,
    range: Number,
    price: Number,
    type: String
}

const IcecarSchema = {
    make: String,
    model: String,
    battery_size: Number,
    range: Number,
    price: Number,
    type: String
}


const Car = mongoose.model("electric_car", carSchema)
var brands_list = []
var model_list = {}

const IceCar = mongoose.model("ICE_car", IcecarSchema)
var Ice_brands_list = []
var Ice_model_list = {}


app.use(express.static("files"))

app.use(bodyParser.json())

// define the first route
app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")
    //console.log('hi')
    //res.sendFile("home.html")
})

app.get("/home.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")
    //console.log('hi2')
    //res.sendFile("home.html")
})

app.get("/find_car.html", function (req, res) {
    //console.log(req.query.brands)
    var query = Car.distinct('make');
    var Ice_query = IceCar.distinct('make');
    
    //var brands = document.getElementById("brands").innerHTML
    //var c = document.createElement("option")
    //query.distinct('make')

    query.exec(function(err,car){
        if (err) return err
        //console.log(car);
        for (let i = 0; i < car.length; i++) {
            //console.log(car[i].split())
            if (!brands_list.includes(car[i])) {
                brands_list.push(car[i])
              }
          }
        //console.log(brands_list, "hi")

    })
    Ice_query.exec(function(err,car){
        if (err) return err
        //console.log(car);
        for (let i = 0; i < car.length; i++) {
            //console.log(car[i].split())
            if (!Ice_brands_list.includes(car[i])) {
                Ice_brands_list.push(car[i])
              }
          }
        //console.log(brands_list, "hi")

    })
    var model_query = Car.find({}).select({make:1, model:1, _id:0});
    model_query.exec(function(err,models){
        if (err) return err
        //console.log(models);
        //console.log(typeof(models[0]))
        //console.log(models.make)
        for (let i = 0; i < models.length; i++) {
            //console.log(models[i])
            x = models[i].make
            y = models[i].model
            //console.log(x,y)
            if (!model_list[x]) {
                model_list[x] = [];
                
            }
            //console.log(model_list[x])
            if (!model_list[x].includes(y)) {
                model_list[x].push(y)
            }
            
        }
    })
    var Ice_model_query = IceCar.find({}).select({make:1, model:1, _id:0});
    Ice_model_query.exec(function(err,models){
        if (err) return err
        //console.log(models);
        //console.log(typeof(models[0]))
        //console.log(models.make)
        for (let i = 0; i < models.length; i++) {
            //console.log(models[i])
            x = models[i].make
            y = models[i].model
            //console.log(x,y)
            if (!Ice_model_list[x]) {
                Ice_model_list[x] = [];
                
            }
            //console.log(model_list[x])
            if (!Ice_model_list[x].includes(y)) {
                Ice_model_list[x].push(y)
            }
            
        }
        //console.log(Ice_model_list)
    })

    
    //console.log(brand_list +"hi");
    res.sendFile(__dirname + "/html/find_car.html")
    //res.sendFile("home.html")
})

// fetch the data from the database when the page loads and send it to the client side in a json file
app.get("/data", function(req,res){
    res.json({brands_list, model_list, Ice_brands_list, Ice_model_list})
 
})


app.get("/login.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/login.html")
    //console.log('hi')
    //res.sendFile("home.html")
})




// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

