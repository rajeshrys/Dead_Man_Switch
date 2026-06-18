const connectdb = require("./src/config/db")
const app = require('./src/app')
require("dotenv").config()
const worker = require("./src/workers/checkworker")
const startCheckWorker = require("./src/workers/checkworker")

connectdb();
startCheckWorker();

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port:${process.env.PORT}`)
})