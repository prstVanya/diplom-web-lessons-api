const mongoose = require('mongoose');

const Classroom = mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'subject',
      required: true,
    }
  ],
  classroomId: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model('classroom', Classroom);