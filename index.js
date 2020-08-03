const { GraphQLServer } = require('graphql-yoga')

const typeDefs = require('./schema');
const resolvers = require('./resolver');
const { run } = require('./db');
const { CREATE_USER_TABLE, CREATE_COUPON_TABLE } = require('./sql');

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'))

Promise.all([run(CREATE_USER_TABLE), run(CREATE_COUPON_TABLE)]).catch(err => console.error(err));
