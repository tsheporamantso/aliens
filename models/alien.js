const mongoose = require('mongoose');

const AlienSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide name'],
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
});

module.exports = mongoose.model('Alien', AlienSchema);
