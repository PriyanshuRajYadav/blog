const express= require("express");
const path = require("path");
const engine= require("ejs-mate")

const app= express();
app.engine("ejs" , engine);
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname, "public")));

const port=8080;

app.get("/" , (req ,res)=>{
    res.render("index.ejs")
});

app.listen(port ,()=>{
    console.log("port is listening on " + port)
});
