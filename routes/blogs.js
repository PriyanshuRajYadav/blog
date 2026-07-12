const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async(req, res) => {
    const allBlogs=await Blog.find({})
    res.render("index",{allBlogs});
});

router.get("/new",(req ,res)=>{
    res.render("new")
});

router.post("/", async(req, res) => {
    const newBlog= new Blog(req.body);
     await newBlog.save();

    res.redirect("/blogs");
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id);

    res.redirect("/blogs");
});

module.exports = router;