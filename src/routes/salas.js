const { Router } = require('express');
const sCotroller = require('../controllers/sala.controller');
const router = Router();

router.get('/',sCotroller.getSalas);
router.get('/:id',sCotroller.getOneSala);
router.post('/',sCotroller.crear_sala);

module.exports = router; 