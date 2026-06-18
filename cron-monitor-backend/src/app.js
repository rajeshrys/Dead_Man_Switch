const express = require("express")
const app = express()
const pingRoutes = require("./routes/ping.routes")

app.use(express.json())
app.use('/api/v1/monitor',pingRoutes)

module.exports  = app;