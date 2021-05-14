const mongoose = require("mongoose");

const Contact_Schema = new mongoose.Schema({
    name :{
        type: String
    },
    email :{
        type : String
    },
    country:{
        type: String
    },
    city: {
        type : String
    },
    message : {
        type: String
    }
});

let Contact_Collection = new mongoose.model("ContactForm", Contact_Schema);
module.exports = Contact_Collection;