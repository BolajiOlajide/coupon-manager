const { GraphQLServer } = require('graphql-yoga')

const typeDefs = require('./schema');
const resolvers = require('./resolver');

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'))