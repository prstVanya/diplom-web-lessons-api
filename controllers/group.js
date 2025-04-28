const Group = require('../models/Session/Group');
const Subject = require('../models/Session/Subject');
const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const UserError = require('../errors/UserError'); // 403

module.exports.getAllGroups = async (req, res, next) => {
  try {
    // Получаем все группы
    const groups = await Group.find();
    
    if (!groups) {
      console.log('Группы не найдены');
      return res.status(404).json({ message: 'Группы не найдены' });
    }

    // Для каждой группы получаем связанные предметы
    for (let group of groups) {
      try {
        // Запросим все предметы для данной группы
        const subjects = await Subject.find({ group: group._id });
        
        // Проверяем, если предметов нет, то оставляем пустой массив
        group.subjects = subjects || [];
      } catch (err) {
        console.log(`Ошибка при получении предметов для группы ${group._id}: `, err);
        group.subjects = []; // Если ошибка при получении предметов, ставим пустой массив
      }
    }

    // Возвращаем все группы с их предметами
    return res.status(200).json(groups);
  } catch (err) {
    console.error('Ошибка при получении групп:', err);
    return next(err);
  }
};

module.exports.getGroupById = async (req, res, next) => {
  const { id } = req.params;  // Получаем id группы из параметров запроса

  try {
    // Ищем группу по id
    const group = await Group.findById(id);
    if (!group) {
      // Если группа не найдена, возвращаем ошибку 404
      return res.status(404).json({ message: 'Группа не найдена' });
    }

    const subjects = await Subject.find({ group: group._id });

    group.subjects = subjects;

    return res.status(200).json(group);
  } catch (err) {
    console.error(`Ошибка при получении группы с id ${id}:`, err);
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