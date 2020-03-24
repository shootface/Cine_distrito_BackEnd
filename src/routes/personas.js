const { Router } = require('express');
const router = Router();
const pController = require('../controllers/persona.controller');

router.get('/',pController.getPersonas);
router.get('/:pk_numero_identificacion',pController.getOnePersona);

module.exports = router;