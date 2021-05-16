const mongoose = require("mongoose");

const User_data = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const User_collection = new mongoose.model("User_Collection",User_data);

module.exports = User_collection;