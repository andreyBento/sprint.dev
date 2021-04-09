const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
    name: String,
    boxes: [String],
    colorBg: String,
    imageBg: String,
    user: String,
});

module.exports = model("Project", ProjectSchema);