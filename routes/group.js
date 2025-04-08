const router = require('express').Router();
const {
  getAllGroups,
  createGroup,
  deleteGroup,
} = require('../controllers/group');

router.get('/groups', getAllGroups);
router.post('/groups', createGroup);
router.delete('/groups/:id', deleteGroup);

module.exports = router;