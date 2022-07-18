const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

//mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/notes")
mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/cars")

const notesSchema = {
    title: String,
    content: String
}
const carSchema = {
    make: String,
    model: String,
    battery_size: Number,
    range: Number,
    price: Number,
    type: String
}

//const Note = mongoose.model("Note", notesSchema)
const Car = mongoose.model("electric_car", carSchema)
var brands_list = []
var model_list = {}


app.use(express.static("files"))

app.use(bodyParser.json())

// define the first route
app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")
    console.log('hi')
    //res.sendFile("home.html")
})

app.get("/home.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/home.html")
    console.log('hi2')
    //res.sendFile("home.html")
})

app.get("/find_car.html", function (req, res) {
    console.log(req.query.brands)
    var query = Car.distinct('make');
    
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
        //console.log(model_list)
    })

    
    //console.log(brand_list +"hi");
    res.sendFile(__dirname + "/html/find_car.html")
    //res.sendFile("home.html")
})

app.get("/data", function(req,res){
    //console.log(model_list)
    res.json({brands_list, model_list})
 
    //res.send(brands_list)
    //console.log('brands')
})

app.get("/login.html", function (req, res) {
    
    res.sendFile(__dirname + "/html/login.html")
    //console.log('hi')
    //res.sendFile("home.html")
})

/*
app.post("/files/find_car.html", function(req,res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();
    res.redirect("/find_car.html");
    
})
*/

/*
var query = Car.find({});

query.select('make')

query.exec(function(err,car){
    if (err) return err
    console.log(car)
})
*/



//console.log(Car.find({}));
//console.log(Car.find({ model: 'Audi'}, function (err, docs) {}));


// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

