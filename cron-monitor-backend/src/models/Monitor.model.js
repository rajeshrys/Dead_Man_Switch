const mongoose = require("mongoose")
const monitorschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum:['healthy','missing','paused'],
        default: 'healthy'
    },
    intervalSeconds: {
    type: Number,
    required: true, 
  },
    gracePeriodSeconds:{
        type: Number,
        required:true,
        default: 300
    },
    lastPingedAt: {
    type: Date,
    default: null
  },
  nextExpectedPing: {
    type: Date,
    default: null
  },
   slackWebhookUrl: {
    type: String,
    trim: true,
    default: null
  },
  emailAlert: {
    type: String,
    trim: true,
    default: null
  }
}, { timestamps: true });


const monitormodel = mongoose.model("monitor",monitorschema)

module.exports = monitormodel