const router = require('express').Router();
const {
  getOneUser,
} = require('../controllers/user');

router.get('/users/me', getOneUser);

module.exports = router;