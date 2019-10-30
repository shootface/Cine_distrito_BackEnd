const { Router } = require('express');
const eController = require('../controllers/empleados.controller');
const router = Router();

router.post('/crear',eController.crear_empleado);
router.get('/',eController.getEmpleados);
router.get('/:fk_persona',eController.getOneEmpleado);

module.exports = router; 