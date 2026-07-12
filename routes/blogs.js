const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/new",(req ,res)=>{
    res.render("new")
});

router.post("/", (req, res) => {
    console.log(req.body);
    res.render("index");
});

module.exports = router;