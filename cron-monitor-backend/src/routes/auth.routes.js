const express = require("express")
const router = express.Router()
const authcontroller = require("../controllers/auth.controller")


router.post('/register',authcontroller.registercontroller);

router.post('/login',authcontroller.logincontroller);

router.post('/logout',authcontroller.logout)


module.exports = router