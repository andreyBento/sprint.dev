const User = require("../models/User");

const userResolver = {
    Query: {
        users() {
            return User.find();
        },
        user(_, { id }) {
            return User.findById(id);
        },
        loginUser(_, { email, password }) {
            return User.findOne({email, password});
        },
    },
    Mutation: {
        createUser(_, { user }) {
            const newUser = new User(user);
            return newUser.save();
        },
        updateUser(_, { id, user }) {
            return User.findByIdAndUpdate(id, user, {
                new: true,
                useFindAndModify: false,
            });
        },
        deleteUser(_, { id }) {
            return User.findByIdAndRemove(id, {
                useFindAndModify: false,
            });
        },
        findLoginUser(_, {email, password}) {
            return User.findOneAndUpdate({email, password}, {loginAuth: true}, {
                new: true,
                useFindAndModify: false,
            });
        }
    },
};

module.exports = userResolver;