const { Router } = require('express');
const sCotroller = require('../controllers/snack.controller');
const router = Router();

router.get('/',sCotroller.getSnacks);
router.get('/:id',sCotroller.getOneSnack);
router.post('/',sCotroller.crear_snack);
router.post('/snack',sCotroller.actualizar_snack);

module.exports = router;