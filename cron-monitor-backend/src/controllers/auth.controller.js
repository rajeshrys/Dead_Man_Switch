const usermodel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
require("dotenv").config()
const blacklistmodel = require("../models/blacklist.model")

async function registercontroller(req,res){

    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:" Missing username,email,password"
            })
        }
        const isexists = await usermodel.findOne({email})
        if(isexists){
            return res.status(409).json({
                message:"User Already exists"
            })
        }
        const hashedpass = await bcrypt.hash(password,10);

        const user = await usermodel.create({
            username,
            email,
            password:hashedpass
        })

        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn: '7d'})
        res.cookie('token',token)
        res.status(200).json({
            message: "User registration Successful",
            user:{
                username,
                email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message:"Error During registration"
        })
    }
}

async function logincontroller(req,res){
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message : "Missing email,password"
            })
        }
        const user = await usermodel.findOne({email}).select("+passsword")
        if(!user){
            return res.status(404).json({
                message: "User not found with Email"
            })
        }
        console.log(user.password)
        const decoded = await bcrypt.compare(password,user.password)
        if(!decoded){
            return res.status(401).json({
                message: "Invalid Crendentials",
            })
        }
        const token = jwt.sign({_id: user.id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie("token",token)

        res.status(200).json({
            message: "User Login Successful",
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error during login"
        })
    }
}

async function logout(req,res){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || req.headers.token
    if(!token){
        return res.status(404).json({
            message:"Token is missing"
        })
    }
    await blacklistmodel.create({
        token 
    })
    res.clearCookie('token')
    res.status(200).json({
        message:"User logged out Successfully"
    })
}

async function getme(req,res){
    const user  = await usermodel.findById(req.user._id)
    res.status(200).json({
        user,
        message:"user fetched successfully"
    })

}

module.exports = {registercontroller,logincontroller,logout}