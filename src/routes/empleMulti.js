const { Router } = require('express');
const emController = require('../controllers/empleMulti.controller');
const router = Router();

router.get('/',emController.getEmpleadosMultiplex);
router.post('/asignar',emController.asignar_empleado);

module.exports = router;