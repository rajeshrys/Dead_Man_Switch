const mongoose = require("mongoose");

const apischema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 100,    
    },
    keyHash:{
        type: String,
        required: true,
    },
    prefix:{
        type: String,
        required: true,
    },
    permission:{
        type: String,
        required: true,
        enum: ["read", "write", "admin"],
        default: "read"
    },
    lastused:{
        type: Date,
        default: null,
    },
    revoked:{
        type: Boolean,
        default: false,
    },
    expiresAt:{
        type: Date,
        default: null,
    }
},{
    timestamps: true,
})

apischema.index({keyHash: 1})
apischema.index({userId: 1})

const apikeymodel = mongoose.model("apikey",apischema);

module.exports = apikeymodel;
