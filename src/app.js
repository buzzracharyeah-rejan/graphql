const express = require('express');
const path = require('path');
const morgan = require('morgan');

/* graphql imports*/
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const connectDB = require('./config/_db');
require('dotenv').config({ path: path.join(__dirname, '/config/.env') });

// register app globally
global.app = express();
app.use(morgan('dev'));

// register graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server up at port ${PORT}`);
});
