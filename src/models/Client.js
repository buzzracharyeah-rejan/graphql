const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'client name required'],
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'client email required'],
    unique: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'valid email required',
    ],
  },
  password: {
    type: String,
    required: [true, 'client password required'],
    trim: true,
  },
});

clientSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 10);
  }

  return next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
