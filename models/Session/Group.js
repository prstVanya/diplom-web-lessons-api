const mongoose = require('mongoose');

const Group = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: Number,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
  }],
});

module.exports = new mongoose.model('group', Group);