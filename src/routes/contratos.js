const { Router } = require('express');
const cController = require('../controllers/contrato.controller');
const mVerified = require('../middlewares/verify.middleware');
const router = Router();

router.get('/',mVerified.auth,cController.getContratos);
router.get('/:id',cController.getOneContrato);
router.post('/crear',cController.crear_contrato);
router.delete('/:id',cController.borrar_contrato);

module.exports = router; 