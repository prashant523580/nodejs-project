const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
let port = process.env.PORT || 8080;
let static_path = path.join(__dirname,"../public");
let template_path = path.join(__dirname,"../templates/views");
let partial_path = path.join(__dirname,"../templates/partials");
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);
app.use(express.static(static_path));
app.get("/",(req,res) => {
    res.render("index")
})
app.get("/about",(req,res) => {
    res.render("about")
})
app.get("/weather",(req,res) => {
    res.render("weather");
    
})
app.get("*",(req,res) => {
    res.render("404_error",{
        error_msg : "not found",
        error_msg1 :"Sorry"
    })
})
app.listen(port, (err) => {
        console.log(`listening port = ${port} `)
})