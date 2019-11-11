const Multiplex = require('../models/multiplex');

async function getSillas(req,res){
    try {
        const sillas = await Multiplex.silla.findAll();
        res.json({
            data: sillas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getSillas',
            data: error
        });
    }
};

async function crear_silla(req,res){
    const {
        pk_numero,
        v_tipo,
        i_orden,
        fk_sala
    } = req.body;
    try {
        let newSilla = await Multiplex.silla.create({
            pk_numero,
            v_tipo,
            i_orden,
            fk_sala
        });
        if(newSilla){
            res.json({
                data: newSilla
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong crear_silla',
            data: error
        });
    }
};

module.exports.getSillas = getSillas;
module.exports.crear_silla = crear_silla;