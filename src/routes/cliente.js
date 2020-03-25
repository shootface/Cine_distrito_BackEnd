const { Router } = require('express');
const cController = require('../controllers/cliente.controller');
const router = Router();

router.post('/',cController.crear_cliente);
router.get('/:fk_persona',cController.getOneCliente);

module.exports = router; 