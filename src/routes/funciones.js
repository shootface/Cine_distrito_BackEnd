const { Router } = require('express');
const fCotroller = require('../controllers/funciones.controller');
const router = Router();

router.get('/',fCotroller.get_funcion_pelicula);
router.get('/',fCotroller.getFunciones);
router.get('/:fk_funcion',fCotroller.getOneFuncion);
router.get('/:fechaP/:id_pelicula',fCotroller.get_funcion_pelicula);
router.post('/',fCotroller.crear_funcion);
router.delete('/:id',fCotroller.borrar_funcion);

module.exports = router;