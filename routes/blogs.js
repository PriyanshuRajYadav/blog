const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/new",(req ,res)=>{
    res.render("new")
});

router.post("/", async(req, res) => {
    const newBlog= new Blog(req.body);
     await newBlog.save();

    res.send("Blog Saved Successfully");
});

module.exports = router;