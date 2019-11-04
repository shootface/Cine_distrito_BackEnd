const { Router } = require('express');
const router = Router();
const pController = require('../controllers/persona.controller');

router.get('/',pController.getPersonas);

module.exports = router;