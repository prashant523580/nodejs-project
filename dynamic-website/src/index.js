const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("../src/db/conn")
const Contact_Collection = require("../src/models/contact_form")


const app = express();
const port = process.env.PORT || 3030;
//setting path
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");
//middleware
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist/")));
app.use(express.static(static_path));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.get("/" ,(req,res) => {
    res.render("index")
})
app.post("/register",async (req,res) => {
    try{
            let user_message = new Contact_Collection({
                name : req.body.username,
                email :req.body.email,
                country: req.body.country,
                city: req.body.city,
                message : req.body.message
            });
            await user_message.save();
            res.render("index");
    }catch(err){
        res.status(500).send(err);
    }
})
app.listen(port , () => {
    console.log(`listening to port ${port}`)
});