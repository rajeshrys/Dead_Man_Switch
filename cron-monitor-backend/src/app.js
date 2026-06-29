const express = require("express")
const app = express()
const cookieparser = require("cookie-parser")
const pingRoutes = require("./routes/ping.routes")
const authRoutes = require("./routes/auth.routes")
const cors = require('cors')

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "https://dead-man-switch-zeta.vercel.app",
    credentials: true
}),)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/monitor',pingRoutes)

module.exports  = app;
