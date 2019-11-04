const { Router } = require('express');
const router = Router();
const lController = require('../controllers/login.controller');

router.post('/',lController.login);

module.exports = router;