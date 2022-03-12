// //import
const express = require('express');
const router = express.Router();
const users_post = require('../model/postSchema');

router.get("/posts", async (req, res) =>{       //fetching all the post created
    const post = await users_post.find(); //{user: req.user} - will give post by sepcific user
    res.json({
        status: "success",
        post
    });
})

router.post("/posts", async (req, res) => {             //creating the new post
    const post = await users_post.create({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        user: req.user
    })
    res.status(200).json({
        status: "success",
        post
    })
})

router.put("/posts/:id", async (req, res) => {      //updating the sepcific post
    const post = await users_post.updateOne({_id: req.params.id, user: req.user}, {body: req.body.body, title: req.body.title})
    if (post.modifiedCount > 0){
        res.status(200).json({
            status: "post updated"
        })
    }else{
        res.status(401).json({
            status: "user can not update this post"
        })
    }
    
})

router.delete("/posts/:id", async (req, res) => {       //deleting the specific post
    const post = await users_post.deleteOne({_id: req.params.id, user: req.user})
    if (post.deletedCount > 0){
        res.status(200).json({
            status: "post deleted"
        })
    }else{
        res.status(401).json({
            status: "user can not delete this post"
        })
    }
    
})


module.exports = router;