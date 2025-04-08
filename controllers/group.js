const Group = require('../models/Session/Group');
const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const UserError = require('../errors/UserError'); // 403

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    return res.status(200).json(groups);
  } catch (err) {
    return next(err);
  }
};

module.exports.createGroup = async (req, res, next) => {
  const {
    name,
    course,
    groupId,
  } = req.body;
  try {
    const group = new Group({
      name,
      course,
      groupId,
    });
    const saveGroup = await group.save();
    return res.status(201).json(saveGroup);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Неккоректные данные'));
    }
    return next(err);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id);
    if (!group) {
      throw new NotFoundError('такого группы нет');
    }
    await Group.findByIdAndDelete(id);
    return res.status(200).json(group);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('неккоректный id'));
    }
    return next(err);
  }
};