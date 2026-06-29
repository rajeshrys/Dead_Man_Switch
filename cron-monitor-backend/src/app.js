const express = require("express")
const app = express()
const cookieparser = require("cookie-parser")
const pingRoutes = require("./routes/ping.routes")
const authRoutes = require("./routes/auth.routes")
const cors = require('cors')
const apiRoutes = require("./routes/apikey.routes");
const cliRoutes = require("./routes/cli.routes");

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}),)
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/api',apiRoutes);
app.use('/api/v1/cli',cliRoutes);
app.use('/api/v1/monitor',pingRoutes);

module.exports  = app;