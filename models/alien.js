const mongoose = require('mongoose');

const AlienSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Must provide name'],
      maxLength: [20, 'Name cannot be more than  20 characters'],
    },
    tech_Stack: {
      type: String,
      required: true,
      trim: true,
    },
    isEmployed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Alien', AlienSchema);
