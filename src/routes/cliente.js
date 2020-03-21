const { Router } = require('express');
const cController = require('../controllers/cliente.controller');
const router = Router();

router.post('/',cController.crear_cliente);

module.exports = router; 