const { buildSchema, GraphQLID, GraphQLString } = require('graphql');
const { GraphQLObjectType } = require('graphql');
const { projects, clients } = require('../sample-data');

// cleint type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
const userSchema = buildSchema(`
type User {
    name: String 
    email: String
    password: String
    token: String
}

input registerInput {
    name: String
    email: String 
    password: String
}

input loginInput {
    email: String
    password: String
}

type Query {
    users: [User]!
    user(id: ID): User!
}

type Mutation {
    login(loginInput: loginInput): User!
    register(registerInput: registerInput): User!
}
`);

module.exports = { userSchema };
