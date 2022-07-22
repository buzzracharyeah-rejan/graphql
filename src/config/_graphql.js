const http = require('http');
const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const startGraphQLServer = async (typeDefs, resolvers) => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

module.exports = startGraphQLServer;
