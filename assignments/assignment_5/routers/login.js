const express = require("express");
const router = express.Router();
const users_data = require("../model/userSchema");
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const {body,  validationResult} = require("express-validator");
const SECRET = "RESTAPI";

router.use(bodyParser.json())

router.post("/register", body("name"), body("email"), body("password"),  (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {name, email, password} = req.body;
        bcrypt.hash(password, 10, async function(err, hash){
            if (err){
                res.status(400).json({
                    status: "failed",
                    message: "Invalid Details"
                })
            }

            const user = await users_data.create({
                name,
                email,
                password: hash
                }
            );
            res.status(200).json({
                status: "sucess",
                user
            })

        })
        
    }catch(e){
        res.josn({
        status: "failed",
        message: e.message
        
        })

    }
    // res.send("ok");
})

//login router
router.post("/login", body("email"), body("password"),  async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {email, password} = req.body
        const user = await users_data.findOne({email})
        if (!user){
            return res.status(401).json({
                status: "failed",
                message: "invalid user"
            })
        }
        bcrypt.compare(password, user.password).then(function(result){
            if (result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                res.status(200).json({
                    status: "sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "failed",
                    message: "User not  authenticated"
                })

            }
        })
        
    }catch(e){
        res.josn({
        status: "failed",
        message: e.message
        
        })

    }
    // res.send("ok");
})




module.exports = router;