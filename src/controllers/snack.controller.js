const Snacks = require('../models/snack');

async function getSnacks(req,res){
    try {
        const snacks = await Snacks.snack.findAll();
        res.json({
            data: snacks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getSnacks',
            data: error
        });
    }
};

async function getOneSnack(req,res){
    const { id } = req.params;
    try {
        const sna = await Snacks.snack.findOne({
            where:{
                id
            }
        });
        res.json({
            data: sna
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneContrato',
            data: error
        });
    }
};

async function crear_snack(req,res){
    const {
        v_tipo,
        v_nombre,
        tx_descripcion,
        i_precio,
        i_puntosofrecidos,
        i_cantidad
    } = req.body;
    try {
        const newSnack = await Snacks.snack.create({
            v_tipo,
            v_nombre,
            tx_descripcion,
            i_precio,
            i_puntosofrecidos,
            i_cantidad
        });
        if(newSnack){
            return res.json({
                message: 'Snack create successfully',
                data: newSnack
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in crear_contrato',
            data: error
        });
    }
};

async function actualizar_snack(req,res){
    const {
        id,
        i_cantidad
    } = req.body;
    try {
        const snack = await Snacks.snack.findOne({
            where:{
                id
            }
        });
        const updateS = await snack.update({
            i_cantidad: snack.i_cantidad - i_cantidad
        });
        return res.json({
            message: 'confirmado',
            data: updateS
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in actualizar_contrato',
            data: error
        });
    }
};

module.exports.getSnacks = getSnacks;
module.exports.getOneSnack = getOneSnack;
module.exports.crear_snack = crear_snack;
module.exports.actualizar_snack = actualizar_snack;