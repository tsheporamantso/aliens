const mongoose = require('mongoose');

const AlienSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide name'],
    validate: {
      validator: (v) => v && v.trim().length > 0,
      message: 'Name cannot be empty',
    },
  },
  tech_Stack: {
    type: [String],
    required: true,
    trim: true,
  },
  isEmployed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

module.exports = mongoose.model('Alien', AlienSchema);
