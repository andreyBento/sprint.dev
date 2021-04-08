const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    username: String,
    loginAuth: Boolean
});

module.exports = model("User", UserSchema);