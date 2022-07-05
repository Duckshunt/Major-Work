const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect("mongodb+srv://Ducksrub:CrvSpTLmXCZfC2Wc@data.dvfjsbk.mongodb.net/notes")

const notesSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", notesSchema)



app.use(express.static("files"))

app.use(bodyParser.json())

// define the first route
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/files/home.html")
    //res.sendFile("home.html")
})

app.post("/files/find_car.html", function(req,res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();
    res.redirect("/find_car.html");
    
})



// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

