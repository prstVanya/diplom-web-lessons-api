const Subject = require('../models/Session/Subject');
const Group = require('../models/Session/Group');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getSubjectsByGroup = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ group: req.params.groupId });
    res.json(subjects);
  } catch (err) {
    return next(err);
  }
};

module.exports.createSubject = async (req, res, next) => {
  const { teacherName, subjectName, subjectType, groupId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Группа не найдена' });
    }

    const groupSubjects = await Subject.find({ group: groupId });
    if (groupSubjects.length >= 4) {
      return res.status(400).json({ message: 'Максимум 4 предмета на группу' });
    }

    const existingSubject = await Subject.findOne({
      teacherName,
      subjectName,
      subjectType
    });

    if (existingSubject) {
      return res.status(400).json({ message: 'Такой предмет уже существует в другой группе' });
    }

    const newSubject = new Subject({
      teacherName,
      subjectName,
      subjectType,
      group: groupId
    });

    await newSubject.save();
    res.status(201).json(newSubject);

  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некоррентные данные'));
    }
    return next(err);
  }
}

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