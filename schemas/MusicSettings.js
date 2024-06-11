const { model, Schema } = require("mongoose");

module.exports = model("musicSettings",	new Schema({
    Guild: String,
    dj: {
        enabled: Boolean,
        roleNames: Array,
        commands: Array
    },
    defaultvolume: {
        type: Number,
        default: 50,
    },
    maxVol: {
        type: Number,
        default: 100,
    },
    leaveOnEnd: {
        type: Boolean,
        default: true,
    },
    leaveOnEmpty: {
        type: Boolean,
        default: true,
    },
    loopMessage: {
        type: Boolean,
        default: false,
    },
    spotifyBridge: Boolean,
}));
