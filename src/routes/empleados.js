const { Router } = require('express');
const getEmpleados = require('../controllers/empleados.controller');
const crear_empleado = require('../controllers/empleados.controller');
const crear_contrato = require('../controllers/empleados.controller');
const asignar_empleado = require('../controllers/empleados.controller');
const router = Router();

router.get('/',getEmpleados);

router.post('/crear_empleado',crear_empleado);
router.post('/crear_contrato',crear_contrato);
router.post('/asignar_empleado',asignar_empleado);

module.exports = router; 