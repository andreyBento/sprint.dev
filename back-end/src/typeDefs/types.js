const { gql } = require("apollo-server");

const type = gql `
    type User {
        id: ID!
        firstName: String
        lastName: String
        password: String!
        username: String
        email: String!
        loginAuth: Boolean
    }
`;

module.exports = type;

