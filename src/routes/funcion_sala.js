const { Router } = require('express');
const fsController = require('../controllers/funcionSala.controller');
const router = Router();

router.get('/',fsController.getFuncionSala);
router.get('/:id',fsController.getOneFuncionSala);
router.post('/',fsController.crear_funcionSala);
router.delete('/',fsController.borrar_Funsala);

module.exports = router;