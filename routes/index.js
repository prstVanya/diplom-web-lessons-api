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
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use(userRouter);

router.use(() => {
  throw new NotFoundError('Страница не найдена');
})


module.exports = router;