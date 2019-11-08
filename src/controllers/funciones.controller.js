const sq = require('sequelize');
const poo = require('../database');
const Funciones = require('../models/funciones');

async function getFunciones(req,res){
    try {
        const funciones = await Funciones.funcion.findAll();
        res.json({
            data: funciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getFunciones',
            data: error
        });
    }
};
async function getOneFuncion(req,res){
    const { id } = req.params;
    try {
        const fun = await Funciones.funcion.findOne({
            where:{
                id
            }
        });
        res.json({
            data: fun
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getFunciones',
            data: error
        });
    }
};
async function crear_funcion(req,res){
    const {
        v_estado,
        d_proyeccion,
        fk_pelicula,
        t_inicioproyeccion,
        t_finproyeccion
    } = req.body;
    try {
        let newFun = await Funciones.funcion.create({
            v_estado,
            d_proyeccion,
            fk_pelicula,
            t_inicioproyeccion,
            t_finproyeccion
        });
        if(newFun){
            return res.json({
                message:'Funciones creada successfully',
                data: newFun
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong crear_funcion',
            data: error
        });
    }
};
async function borrar_funcion(req,res){
    const { id } = req.params;
    try {
        await Funciones.funcion.destroy({
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
            message: 'Something goes wrong in borrar_funcion',
            data: error
        });
    }
};

module.exports.getFunciones = getFunciones;
module.exports.getOneFuncion = getOneFuncion;
module.exports.crear_funcion = crear_funcion;
module.exports.borrar_funcion = borrar_funcion;