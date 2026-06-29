const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    apiKeyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apikey",
        default: null
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    method: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    ipAddress: {
        type: String,
        default: "unknown"
    },
    userAgent: {
        type: String,
        default: "unknown"
    },
    statusCode: {
        type: Number,
        required: true
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

// Indexes for query performance
auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ apiKeyId: 1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
