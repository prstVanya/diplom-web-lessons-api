const mongoose = require('mongoose');

const Subject = mongoose.Schema({
  teacherName: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  subjectType: {
    type: String,
    enum: ['лекция', 'практика'],
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
    required: true
  }
});

subjectSchema.index({ teacherName: 1, subjectName: 1, subjectType: 1 }, { unique: true });

module.exports = new mongoose.model('subject', Subject);