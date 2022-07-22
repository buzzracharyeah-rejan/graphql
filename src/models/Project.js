const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  status: String,
  client: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
