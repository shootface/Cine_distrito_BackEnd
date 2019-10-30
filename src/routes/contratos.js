const { Router } = require('express');
const cController = require('../controllers/contrato.controller');
const router = Router();

router.get('/',cController.getContratos);
router.get('/crear',cController.crear_contrato);
router.get('/:id',cController.getOneContrato);

module.exports = router; 