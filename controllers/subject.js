const Subject = require('../models/Session/Subject');
const Group = require('../models/Session/Group');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getSubjectsByGroup = async (req, res, next) => {
  try {
    const { groupId } = req.query;
    if (!groupId) {
      return res.status(400).json({ message: 'Не передан groupId' });
    }

    const subjects = await Subject.find({ group: groupId }).populate('group');
    res.status(200).json(subjects);
  } catch (err) {
    return next(err);
  }
};

module.exports.createSubject = async (req, res, next) => {
  const { teacherName, subjectName, subjectType, groupId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new NotFoundError('Такой группы нет!');
    }

    const existingSubjects = await Subject.find({ group: groupId });
    if (existingSubjects.length >= 4) {
      throw new BadRequestError('Максимум 4 предмета на группу');
    }

    const newSubject = new Subject({
      teacherName,
      subjectName,
      subjectType,
      group: groupId
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};

module.exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      throw new NotFoundError('такой группы нет!');
    }
    await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Предмет удален' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('проблемма с _id'));
    }
    return next(err);
  }
};