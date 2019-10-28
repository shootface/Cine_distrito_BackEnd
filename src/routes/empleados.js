const { Router } = require('express');
const create_empleado = require('../controllers/empleados.controller');
const router = Router();

router.post('/create_empleado',create_empleado);
module.exports = router; 