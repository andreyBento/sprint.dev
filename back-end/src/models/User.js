const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    username: String,
    job: String,
    colorBg: String,
    projects: [String]
});

module.exports = model("User", UserSchema);