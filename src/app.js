const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server');

const connectDB = require('./config/_db');
const { gql } = require('apollo-server-core');
const { books } = require('./sample-data');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config({ path: path.join(__dirname, '/config/.env') });

// register app globally
global.app = express();
app.use(morgan('dev'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen().then(({ url }) => {
  connectDB();
  console.log(`🚀  Server ready at ${url}`);
});
