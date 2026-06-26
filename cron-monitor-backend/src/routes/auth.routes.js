const express = require("express")
const router = express.Router()
const authcontroller = require("../controllers/auth.controller")


router.post('/register',authcontroller.registercontroller);

router.post('/login',authcontroller.logincontroller);

router.post('/logout',authcontroller.logout)

router.get('/me',authcontroller.getme)

module.exports = router