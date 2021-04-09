const { gql } = require("apollo-server");

const query = gql `
    type Query {
        users: [User]
        user(id: ID!): User
        loginUser(email: String!, password: String!): User
        
        projects: [Project]
        project(id: ID!): Project
        
        boxes: [Box]
        box(id: ID!): Box
        
        sprints: Sprint
        sprint(id: ID!): Sprint
    }
`;

module.exports = query;