const express = require("express")
const router = express.Router()
const {handleping, createMonitor } = require("../controllers/ping.controller")
const { requireAuth } = require("../middleware/auth.middleware")

router.post("/create", requireAuth, createMonitor)
router.get("/handle/:monitorId",handleping);



module.exports = router