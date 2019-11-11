const Multiplex = require('../models/multiplex');

async function getMultiplexs(req,res){
    try {
        const multiplexs = await Multiplex.multiplex.findAll();
        res.json({
            data: multiplexs
        });
        res.json
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getMultiplexs',
            data: error
        });
    }
};

async function crear_multiplex(req,res){
    const {
        v_nombre,
        v_direccion,
        v_ciudad,
        i_minsalas,
        i_maxsalas
    } = req.body;
    try {
        let newMultiplex = await Multiplex.multiplex.create({
            v_nombre,
            v_direccion,
            v_ciudad,
            i_minsalas,
            i_maxsalas
        });
        if(newMultiplex){
            res.json({
                data: newMultiplex
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong crear_multiplex',
            data: error
        });
    }
};

module.exports.getMultiplexs = getMultiplexs;
module.exports.crear_multiplex = crear_multiplex;