const { model, Schema } = require("mongoose")

module.exports = model("welcome", new Schema({

    Guild: String,
    Channel: String,
    Msg: String,
    Content: Boolean,
    Embed: Boolean,
    ImageURI: String,
    Image: Boolean,


}))