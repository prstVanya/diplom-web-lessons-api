const router = require('express').Router();
const {
  createClassRoom,
  getAllClassrooms,
} = require('../controllers/classroom');

router.get('/classrooms', getAllClassrooms);
router.post(
  '/classrooms',
  createClassRoom,
);

module.exports = router;