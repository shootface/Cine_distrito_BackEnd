const { Router } = require('express');
const eController = require('../controllers/empleados.controller');
const router = Router();

router.post('/crear',eController.crear_empleado);
router.post('/contrato',eController.crear_contrato);
router.post('/asignar',eController.asignar_empleado);
router.get('/',eController.getEmpleados);
router.get('/contratos',eController.getContratos);
router.get('/em',eController.getEmpleadosMultiplex);

module.exports = router; 