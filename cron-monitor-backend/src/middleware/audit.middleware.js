const AuditLog = require("../models/auditlog.model");

async function auditLogger(req, res, next) {
    res.on("finish", async () => {
        try {
            // Determine the action name from path or default to last segment
            // E.g., /api/v1/cli/sync -> sync
            const pathParts = (req.originalUrl || req.path).split("?")[0].split("/");
            const action = req.auditAction || pathParts.filter(Boolean).pop() || "unknown";

            const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip || "unknown";
            const userAgent = req.headers["user-agent"] || "unknown";

            await AuditLog.create({
                userId: req.user?._id || null,
                apiKeyId: req.apiKey?._id || null,
                action: action,
                method: req.method,
                path: req.originalUrl || req.path,
                ipAddress: ip,
                userAgent: userAgent,
                statusCode: res.statusCode
            });
        } catch (error) {
            console.error("Failed to log audit record in middleware:", error);
        }
    });

    next();
}

module.exports = { auditLogger };
