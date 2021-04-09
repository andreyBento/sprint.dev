const Box = require("../models/Box");

const boxResolver = {
    Query: {
        boxes() {
            return Box.find();
        },
        box(_, { id }) {
            return Box.findById(id);
        },
    },
    Mutation: {
        createBox(_, { box }) {
            const newBox = new Box(box);
            return newBox.save();
        },
        updateBox(_, { id, box }) {
            return Box.findByIdAndUpdate(id, box, {
                new: true,
                useFindAndModify: false,
            });
        },
        deleteBox(_, { id }) {
            return Box.findByIdAndRemove(id, {
                useFindAndModify: false,
            });
        }
    },
};

module.exports = boxResolver;