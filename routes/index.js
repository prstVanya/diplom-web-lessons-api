const router = require('express').Router();
const {
  createUser,
  login,
} = require('../controllers/user');
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const userRouter = require('./user');
const subjectRouter = require('./subject');
const classRoomRouter = require('./classroom');
const teacherRouter = require('./teacher');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use(userRouter);
router.use(subjectRouter);
router.use(classRoomRouter);
router.use(teacherRouter);

router.use(() => {
  throw new NotFoundError('Страница не найдена');
})


module.exports = router;