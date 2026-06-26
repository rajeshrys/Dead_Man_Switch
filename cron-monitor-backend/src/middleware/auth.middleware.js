const jwt = require("jsonwebtoken")
const blacklistmodel = require("../models/blacklist.model")

async function requireAuth(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Authentication required" })
    }
    try {
        const blacklisted = await blacklistmodel.findOne({ token })
        if (blacklisted) {
            return res.status(401).json({ message: "Token has been blacklisted" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = { requireAuth }
