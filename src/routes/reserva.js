const { Router } = require('express');
const rCotroller = require('../controllers/reserva.controller');
const mVerified = require('../middlewares/verify.middleware');
const router = Router();

router.post('/',mVerified.auth,rCotroller.crear_reserva);
router.post('/silla',mVerified.auth,rCotroller.reservar_silla);
router.post('/snack',mVerified.auth,rCotroller.reservar_snack)
router.get('/',mVerified.auth,rCotroller.disponibilidadSillas); // Se elimina la autenticación para pruebas con Capataz 14 de marzo de 2020

module.exports = router;