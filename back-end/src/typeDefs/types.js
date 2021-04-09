const { gql } = require("apollo-server");

const type = gql `
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        password: String!
        username: String
        email: String!
        job: String
        colorBg: String
        projects: [ID]
        imageBg: String
    }
    
    type Project {
        id: ID!
        name: String!
        boxes: [ID]
        colorBg: String
        imageBg: String
        user: ID!
    }
    
    type Box {
        id: ID!
        name: String!
        project: ID!
        sprints: [ID]
    }
    
    type Sprint {
        id: ID!
        name: String!
        creationDate: String!
        finalDate: String!
        box: ID!
    }
`;

module.exports = type;

