//import
const mongoose = require("mongoose");
const express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const loginRoutes = require("./routers/login")
// const userRoutes = require("./routers/user");
const postRoutes = require("./routers/post");
const jwt = require('jsonwebtoken');
const SECRET = "RESTAPI";

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

//setting static files if any needed
app.use(express.static('public'))
// app.use('css', express.static(__dirname + 'public/css'));

mongoose.connect('mongodb://localhost:27017/assignment_5');

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use("/api/posts", (req, res, next) => {
    var token = req.headers.authorization.split("test ")[1];
    if (!token){
        return res.status(401).json({
            status: "failed",
            message: "Invalid Token"
        })
    }
    //verify the token
    jwt.verify(token, SECRET, function(err, decoded){
    if (err){
        return res.status(401).json({
            status: "failed",
            message: "Invalid Token"
        })
    }
    req.user = decoded.data
})
    next();
    
})

// app.use("/api/users", userRoutes)
app.use("/api", loginRoutes);
app.use("/api", postRoutes)

app.listen(port, () => console.info(`sever is running on port ${port}`))
