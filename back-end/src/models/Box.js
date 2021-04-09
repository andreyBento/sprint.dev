const { Schema, model } = require("mongoose");

const BoxSchema = new Schema({
    name: String,
    project: String,
    sprints: [String]
});

module.exports = model("Box", BoxSchema);