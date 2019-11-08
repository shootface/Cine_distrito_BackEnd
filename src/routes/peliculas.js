const { Router } = require('express');
const pCotroller = require('../controllers/pelicula.controller');
const router = Router();
const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'./images/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = Multer({storage: storage});

router.post('/',upload.single('image'),pCotroller.crear_pelicula);
router.get('/',pCotroller.getPeliculas);
router.delete('/:id',pCotroller.borrar_pelicula);

module.exports = router;