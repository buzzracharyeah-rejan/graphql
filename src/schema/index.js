const mongoose = require('mongoose');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const Client = require('../models/Client');
const Project = require('../models/Project');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: async (parent, args) => {
        const client = await Client.findById(parent.client);
        return client;
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async (parent, args) => {
        const projects = await Project.find();
        return projects;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const project = await Project.findById(args.id);
        return project;
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: async (parent, args) => {
        const clients = await Client.find();
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const client = await Client.findById(args.id);
        return client;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    createClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { name, email, phone } = args;
        const client = new Client({ name, email, phone });
        await client.save();
        return client;
      },
    },
    createProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const { title, description, status, client } = args;
        const project = new Project({ title, description, status, client });
        project.save();
        return project;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
