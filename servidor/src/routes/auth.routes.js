const { methods } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/api/register/', methods.register)
router.get('/api/login/', methods.login)
router.get('/api/users/', methods.getAll)


module.exports = router;