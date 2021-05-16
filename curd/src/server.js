const express = require("express");
const hbs = require("hbs");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3030;
//database connection
require("./db/db_con");
const app = express();
const User_collection = require("./models/curd_data");

const static_path = path.join(__dirname,"../public");
const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", templates_path);
app.use(express.static(static_path));
hbs.registerPartials(partial_path);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.get("/", async(req,res) => {
    try{

        const user_data = await User_collection.find();
        // const arr_data = [data];
        // res.send(arr_data);
        res.render("index.ejs",{
            data : user_data,
        });
    }catch(err){
        res.status(500).send(err);
    }
})
app.get("/admin", (req,res) => {
    res.render("admin.hbs");
})

app.post("/register",async (req,res) => {
    try{

        const data = new User_collection(req.body);
        console.log(data)
        await data.save();
        // res.render("index.ejs");
        res.render("admin.hbs");
    }catch(err){
        res.status("500").send(err);
    }
})

app.put("/update", async(req,res) => {
    try{
        console.log(req.body.name);
        let _id = req.body._id;
    //     console.log(_id)
      
        const update_data = await  User_collection.findByIdAndUpdate(
            _id,
            {
                $set:{
                    name : req.body.name,
                    address : req.body.address,
                    email : req.body.email,
                    phone: req.body.phone,
                    dob: req.body.dob
                }
            },
            {
                upsert : true
            }
        )
        .then(result => {
            res.json("Success");
        })
        .catch(err => console.error(err))
        
        await update_data.save();
        res.render("quotes");
    }catch(err){
        res.status(500).send(err)
    }
})

app.delete("/delete",async (req,res) => {
        try{
                let _id = req.body._id;
                console.log(_id)
                const delete_data = await User_collection.findByIdAndDelete(_id)
                const data = await delete_data.json();
                
                res.render("index");
        }catch(err){
                res.status(500).send(err);
        }
})
app.listen(port,() => {
    console.log(`listening to port ${port}`);
})