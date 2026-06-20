const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ],
    },
    password:{
        type:String,
        required:true,
    }

},{
    timestamps:true,
})

const usermodel = mongoose.model("user",userschema)

module.exports = usermodel