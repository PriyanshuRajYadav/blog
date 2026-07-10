const express= require("express");
const path = require("path");
const engine= require("ejs-mate")
const blogRoutes = require("./routes/blog");

const app= express();
app.engine("ejs" , engine);
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname, "public")));

const port=8080;

app.use("/", blogRoutes);
app.listen(port ,()=>{
    console.log("port is listening on " + port)
});
