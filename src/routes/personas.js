const { Router } = require('express');
const router = Router();
const pController = require('../controllers/persona.controller');

router.get('/',pController.getPersonas);
router.get('/:id',pController.getOnePersona);

module.exports = router;