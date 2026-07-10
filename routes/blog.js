const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/new",(req ,res)=>{
    res.send("Create blog post")
})

module.exports = router;