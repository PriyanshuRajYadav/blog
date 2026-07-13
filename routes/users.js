const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username });

    await User.register(newUser, password);

    res.send("User Registered Successfully");
});

module.exports = router;