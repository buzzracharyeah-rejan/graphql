const { gql } = require('apollo-server');

const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    status: String!
    handover: Boolean
    client: Client!
  }

  input projectInput {
    title: String!
    description: String!
    status: String!
    handover: Boolean
    client: ID!
  }

  input clientInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    Clients: [Client]!
    Client(id: ID!): Client!
    Projects: [Project]!
    Project(id: ID!): Project
  }

  type Mutation {
    createProject(projectInput: projectInput): Project!
    createClient(clientInput: clientInput): Client!
  }
`;

module.exports = typeDefs;
