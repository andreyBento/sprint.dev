const { gql } = require("apollo-server");

const mutations = gql `
    type Mutation {
        createUser(user: UserInput): User
        updateUser(id: ID, user: UpdateUser): User
        deleteUser(id: ID): User
        
        createProject(project: ProjectInput): Project
        updateProject(id: ID, project: UpdateProject): Project
        deleteProject(id: ID): Project
        
        createBox(box: BoxInput): Box
        updateBox(id: ID, box: UpdateBox): Box
        deleteBox(id: ID): Box
        
        createSprint(box: SprintInput): Sprint
        updateSprint(id: ID, sprint: UpdateSprint): Sprint
        deleteSprint(id: ID): Sprint
    }
    
    input UserInput {
        firstName: String
        lastName: String
        password: String!
        email: String!
        username: String
        colorBg: String
    }
    
    input UpdateUser {
        firstName: String
        lastName: String
        password: String
        email: String
        username: String
        colorBg: String
        projects: [ID]
    }
    
    input ProjectInput {
        name: String!
        colorBg: String!
        user: String!
    }
    
    input UpdateProject {
        name: String
        colorBg: String
        boxes: [ID]
        imageBg: String
    }
    
    input BoxInput {
        name: String!
        project: ID!
    }
    
    input UpdateBox {
        name: String
        sprints: [ID]
    }
    
    input SprintInput {
        name: String!
        creationDate: String!
        finalDate: String!
        box: ID!
    }
    
    input UpdateSprint {
        name: String
        finalDate: String
        box: ID
    }
`;

module.exports = mutations;