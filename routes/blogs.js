const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async(req, res) => {
    const allBlogs=await Blog.find({})
    res.render("index",{allBlogs});
});

router.get("/new",(req ,res)=>{
    res.render("name")
});


router.get("/new/create", (req, res) => {
    res.render("new", {
        author: req.query.author
        
    });
});



router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    res.render("show", { blog });
});

router.get("/:id/edit", async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    res.render("edit", { blog });
});

router.post("/", async(req, res) => {
    const newBlog= new Blog(req.body);
     await newBlog.save();

    res.redirect("/blogs");
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    await Blog.findByIdAndUpdate(id, req.body);

    res.redirect(`/blogs/${id}`);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id);

    res.redirect("/blogs");
});

module.exports = router;