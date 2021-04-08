const { gql } = require("apollo-server");

const mutations = gql `
    type Mutation {
        createUser(user: UserInput): User
        updateUser(id: ID, user: UserInput): User
        deleteUser(id: ID): User
        findLoginUser(user: LoginInput): User
    }
    
    input UserInput {
        firstName: String
        lastName: String
        password: String!
        email: String!
        username: String
    }
    
    input LoginInput {
        email: String!
        password: String!
    }
`;

module.exports = mutations;