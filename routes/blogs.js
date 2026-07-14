const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }

    next();
}

async function isAuthor(req, res, next) {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog.author.equals(req.user._id)) {
        return res.redirect("/blogs");
    }

    next();
}

router.get("/", async(req, res) => {
    const allBlogs = await Blog.find({}).populate("author");
    res.render("index",{allBlogs});
});

router.get("/new",isLoggedIn,(req ,res)=>{
    res.render("new")
});






router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id).populate("author");

    res.render("show", { blog });
});

router.get("/:id/edit", isLoggedIn, isAuthor, async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    res.render("edit", { blog });
});

router.post("/", isLoggedIn, async(req, res) => {
    const newBlog= new Blog(req.body);


    newBlog.author = req.user._id;
     await newBlog.save();

    

    res.redirect("/blogs");
});

router.put("/:id",isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;

    await Blog.findByIdAndUpdate(id, req.body);

    res.redirect(`/blogs/${id}`);
});

router.delete("/:id",isLoggedIn, isAuthor, async (req, res) => {
    const id = req.params.id;

    await Blog.findByIdAndDelete(id);

    res.redirect("/blogs");
});

module.exports = router;