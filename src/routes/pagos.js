const { Router } = require('express');
const router = Router();
const pController = require('../controllers/pago.controller');

router.get('/',pController.calculo_factura);

module.exports = router;