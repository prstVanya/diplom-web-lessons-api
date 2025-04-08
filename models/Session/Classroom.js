const mongoose = require('mongoose');

const Classroom = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['лекция', 'практика'],
    required: true,
  },
});

module.exports = mongoose.model('classroom', Classroom);