const { gql } = require("apollo-server");

const query = gql `
    type Query {
        users: [User]
        user(id: ID!): User
        loginUser(email: String!, password: String!): User
    }
`;

module.exports = query;