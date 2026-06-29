const crypto = require("crypto");
const apikeymodel = require("../models/apikey.model");

async function requireApiKey(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const rawKey = authHeader.split(" ")[1];
        if (!rawKey) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const hash = crypto.createHash("sha256").update(rawKey).digest("hex");
        const apiKeyRecord = await apikeymodel.findOne({ keyHash: hash });

        if (!apiKeyRecord) {
            return res.status(401).json({ message: "Invalid API key" });
        }

        // Attach key and user context to request
        req.apiKey = apiKeyRecord;
        req.user = { _id: apiKeyRecord.userId };

        // Check if revoked
        if (apiKeyRecord.revoked) {
            return res.status(401).json({ message: "API key has been revoked" });
        }

        // Check if expired
        if (apiKeyRecord.expiresAt && new Date() > new Date(apiKeyRecord.expiresAt)) {
            return res.status(401).json({ message: "API key has expired" });
        }

        // Update lastUsed asynchronously or synchronously
        apiKeyRecord.lastused = new Date();
        await apiKeyRecord.save();

        next();
    } catch (error) {
        console.error("API Key authentication error:", error);
        return res.status(500).json({ message: "Internal server error during authentication" });
    }
}

module.exports = { requireApiKey };
