const mongoose = require("mongoose")
const dns = require("node:dns")
const { connect } = require("node:http2")
dns.setServers(["1.1.1.1","8.8.8.8"])
require("dotenv").config()

async function connectdb(){
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Connected to database")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectdb