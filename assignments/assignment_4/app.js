// //import
const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser')
const user_details = require('./model/userModel');
var methodOverride = require('method-override')

const app = express();
const port = 3000;

//setting static files if any needed
app.use(express.static('public'))
// app.use('css', express.static(__dirname + 'public/css'));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/assignment_4');


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//fetching data from database
app.get("/", async (req, res) => {
        const users = await user_details.find();
        res.render("index.ejs", {users});
})

app.get("/form", (req, res) => {
    res.render("form.ejs")
})

// //create data
app.post("/add/users", async (req, res) => {
        user_details.create(req.body);
        res.redirect("/")
    });

// updating data
app.put("/users/:id/update", async (req, res) => {
    await user_details.updateOne({_id: req.params.id}, [{$set:{isPromoted:{$eq:[false,"$isPromoted"]}}}]);
    res.redirect("/");
});

// using below conditionla $set to toggle between true and false
// [{$set:{isPromoted:{$eq:[false,"$isPromoted"]}}}]


//deleting data
app.delete("/users/:id/delete", async (req, res) => {
    await user_details.deleteOne({_id: req.params.id});
    res.redirect("/");
})

app.listen(port, () => console.info(`sever is running on port ${port}`))
