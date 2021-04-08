require("dotenv").config();

const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers/userResolver");

// const db = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASS,
//     name: process.env.DB_NAME,
// };

// const dbUri = `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`;
const dbUriF = 'mongodb+srv://admin:Andrey@14@cluster0.sxqq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(dbUriF, dbOptions)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Databased failed: ", error));

// GraphQL
const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen()
    .then(({ url }) => console.log(`Server ready at ${url}`))
    .catch((error) => console.log("Server failed: ", error));