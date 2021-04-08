const query = require("./query");
const mutation = require("./mutations");
const types = require("./types");

const typeDefs = [query, mutation, types];

module.exports = typeDefs;