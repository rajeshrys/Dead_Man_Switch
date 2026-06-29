const { generateapiKey } = require("../utils/crypto");
const apikeymodel = require("../models/apikey.model");
const AuditLog = require("../models/auditlog.model");

async function  createapikey(req, res) {
    try {
        const { name, permission, expiresIn } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "API Key name is required"
            });
        }

        console.log("passed me");

        const { rawkey, prefix, keyhash } = generateapiKey();

        let expiresAt = null;
        if (expiresIn && expiresIn !== "never") {
            const days = parseInt(expiresIn);
            if (!isNaN(days)) {
                expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + days);
            }
        }

        const newrecord = new apikeymodel({
            userId: req.user._id,
            name: name,
            keyHash: keyhash,
            prefix: prefix,
            permission: permission || 'read',
            lastused: null,
            revoked: false,
            expiresAt: expiresAt
        });

        await newrecord.save();

        return res.status(201).json({
            message: "API key created successfully",
            apiKey: rawkey
        });
        
    } catch (error) {
        console.error("API key creation error:", error);
        return res.status(500).json({
            message: "Error during the apikey generation"
        });
    }
}

async function listapikeys(req, res) {
    try {
        const records = await apikeymodel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            apiKeys: records
        });
    } catch (error) {
        console.error("List API keys error:", error);
        return res.status(500).json({
            message: "Error listing API keys"
        });
    }
}

async function revokeapikey(req, res) {
    try {
        const keyId = req.params.id;
        const record = await apikeymodel.findOne({
            $or: [{ _id: keyId }, { id: keyId }],
            userId: req.user._id
        });

        if (!record) {
            return res.status(404).json({
                message: "API Key not found"
            });
        }

        record.revoked = true;
        await record.save();

        return res.status(200).json({
            success: true,
            message: "API key revoked successfully"
        });
    } catch (error) {
        console.error("Revoke API key error:", error);
        return res.status(500).json({
            message: "Error revoking API key"
        });
    }
}

async function getauditlogs(req, res) {
    try {
        const records = await AuditLog.find({ userId: req.user._id })
            .populate("apiKeyId")
            .sort({ createdAt: -1 })
            .limit(100);
        return res.status(200).json({
            success: true,
            auditLogs: records
        });
    } catch (error) {
        console.error("Get audit logs error:", error);
        return res.status(500).json({
            message: "Error fetching audit logs"
        });
    }
}



module.exports = {
    createapikey,
    listapikeys,
    revokeapikey,
    getauditlogs
};