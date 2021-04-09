const { Schema, model } = require("mongoose");

const SprintSchema = new Schema({
    name: String,
    creationDate: String,
    finalDate: String,
    box: String
});

module.exports = model("Sprint", SprintSchema);