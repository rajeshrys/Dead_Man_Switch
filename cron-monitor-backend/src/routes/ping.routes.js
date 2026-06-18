const express = require("express")
const router = express.Router()
const {handleping, createMonitor } = require("../controllers/ping.controller")

router.post("/create",createMonitor)
router.get("/handle/:monitorId",handleping);



module.exports = router