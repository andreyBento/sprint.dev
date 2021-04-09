const Sprint = require("../models/Sprint");

const sprintResolver = {
    Query: {
        sprints() {
            return Sprint.find();
        },
        sprint(_, { id }) {
            return Sprint.findById(id);
        },
    },
    Mutation: {
        createSprint(_, { sprint }) {
            const newSprint = new Sprint(sprint);
            return newSprint.save();
        },
        updateSprint(_, { id, sprint }) {
            return Sprint.findByIdAndUpdate(id, sprint, {
                new: true,
                useFindAndModify: false,
            });
        },
        deleteSprint(_, { id }) {
            return Sprint.findByIdAndRemove(id, {
                useFindAndModify: false,
            });
        }
    },
};

module.exports = sprintResolver;