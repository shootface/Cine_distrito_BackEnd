const Funciones = require('../models/funciones');

async function getFuncionSala(req,res){
    try {
        const funcionSala = await Funciones.funcionSala.findAll();
        res.json({
            data: funcionSala
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getFuncionSala',
            data: error
        });
    }
};

async function getOneFuncionSala(req,res){
    const { fk_funcion } = req.params;
    try {
        const fun = await Funciones.funcionSala.findOne({
            where:{
                fk_funcion
            }
        });
        res.json({
            data: fun
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneFuncionSala',
            data: error
        });
    }
};

async function crear_funcionSala(req,res){
    const {
        fk_funcion,
        fk_sala
    } = req.body;
    try {
        let newFunSal = await Funciones.funcionSala.create({
            fk_funcion,
            fk_sala
        })
        if(newFunSal){
            return res.json({
                message: 'creada successfully',
                data: newFunSal
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong crear_funcion',
            data: error
        });
    }
};

async function borrar_Funsala(req,res){
    const { id } = req.params;
    try {
        await Funciones.funcionSala.destroy({
            where:{
                id
            }
        });
        res.json({
            message: 'Funcion deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in borrar_Funsala',
            data: error
        });
    }
};

module.exports.getFuncionSala = getFuncionSala;
module.exports.getOneFuncionSala = getOneFuncionSala;
module.exports.crear_funcionSala = crear_funcionSala;
module.exports.borrar_Funsala  = borrar_Funsala;