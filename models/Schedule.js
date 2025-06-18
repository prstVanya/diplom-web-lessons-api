const mongoose = require('mongoose');

const Schedule = mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classroom',
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  pair: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model('schedule', Schedule);
