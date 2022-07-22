const { ApolloError } = require('apollo-server-errors');
const mongoose = require('mongoose');

const Client = require('../models/Client');
const Project = require('../models/Project');

const resolvers = {
  Query: {
    Clients: async (parent, args, context, info) => {
      const clients = await Client.find();

      if (clients.length === 0) {
        throw new ApolloError('client does not exists', 404);
      }

      return clients;
    },
    Client: async (parent, args, context, info) => {
      console.log(args);
      const client = await Client.findById(mongoose.Types.ObjectId(args.id));

      if (!client) {
        throw new ApolloError('client does not exists', 404);
      }

      return client;
    },
    Projects: async (parent, args, context, info) => {
      const projects = await Project.find();

      if (projects.length === 0) {
        throw new ApolloError('projects does not exists', 404);
      }

      return projects;
    },
    Project: async (parent, args, context, info) => {
      const project = await Project.findById(args.id);

      if (!project) {
        throw new ApolloError('project does not exists', 404);
      }

      return client;
    },
  },
  Mutation: {
    createProject: async (parent, args, context, info) => {
      const { title, description, status, handover, client } = args.projectInput;

      const project = new Project({
        title,
        description,
        status,
        handover,
        client: mongoose.Types.ObjectId(client),
      });
      await project.save();

      return project;
    },
    createClient: async (parent, { clientInput: { name, email, password } }, context, info) => {
      console.log(parent, context, info);
      const client = new Client({ name, email, password });
      await client.save();
      return client;
    },
  },
};

module.exports = resolvers;
