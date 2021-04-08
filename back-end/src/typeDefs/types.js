const { gql } = require("apollo-server");

const type = gql `
    type User {
        id: ID!
        firstName: String
        lastName: String
        password: String!
        username: String
        email: String!
        job: String
        colorBg: String
    }
`;

module.exports = type;

