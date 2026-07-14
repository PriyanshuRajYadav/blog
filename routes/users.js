const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login",}),(req, res) => {
        res.redirect("/blogs");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.render("landing");
    });
});
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username });

    await User.register(newUser, password);

    res.render("users/login");
});

module.exports = router;