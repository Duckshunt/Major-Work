const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/notes")

//create a data schema
const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", notesSchema)

app.get("/", function(req,res){
    //res.sendFile(__dirname + "js/test.html")
    res.send('hello')
})

app.get("/find_car", function(req,res){
    res.sendFile( "/find_car.html")
})

app.post("/", function(req,res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();
    res.redirect("/");
})

app.post("/find_car", function(req,res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();
    res.redirect("/find_car");
})

app.listen(8080, function() {
    console.log("server is running on 8080")
})

