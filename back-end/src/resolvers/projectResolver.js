const Project = require("../models/Project");

const projectResolver = {
    Query: {
        projects() {
            return Project.find();
        },
        project(_, { id }) {
            return Project.findById(id);
        },
    },
    Mutation: {
        createProject(_, { project }) {
            const newProject = new Project(project);
            return newProject.save();
        },
        updateProject(_, { id, project }) {
            return Project.findByIdAndUpdate(id, project, {
                new: true,
                useFindAndModify: false,
            });
        },
        deleteProject(_, { id }) {
            return Project.findByIdAndRemove(id, {
                useFindAndModify: false,
            });
        }
    },
};

module.exports = projectResolver;