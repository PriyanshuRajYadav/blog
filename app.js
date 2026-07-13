const express= require("express");
const path = require("path");
const engine= require("ejs-mate")
const blogRoutes = require("./routes/blogs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const app= express();
app.engine("ejs" , engine);
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname, "public")));

const port=8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: false,
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/blogs", blogRoutes);
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}
app.listen(port ,()=>{
    console.log("port is listening on " + port)
});
