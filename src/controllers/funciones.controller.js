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
async function get_funcion_pelicula(req,res){
    const { 
        fechaP,
        id_pelicula
    } = req.params;
    let funciones = null;
    try {
        await poo.query("\
        select multiplex.v_nombre,funcion_sala.fk_funcion,funcion_sala.fk_sala,funcion.t_inicioproyeccion, funcion.t_finproyeccion, funcion.v_estado, funcion.v_tipo_proyeccion\
        from funcion_sala,funcion,sala,multiplex,pelicula\
        where funcion_sala.fk_funcion = funcion.id\
        and funcion_sala.fk_sala = sala.id\
        and sala.fk_multiplex = multiplex.id\
        and funcion.fk_pelicula = pelicula.id\
        and funcion.d_proyeccion = :fecha\
        and pelicula.id = :pelicula\
        order by multiplex.v_nombre,funcion_sala.id\
        ",
        {
            replacements:{
                pelicula: id_pelicula,
                fecha: fechaP
            },
            type:sq.QueryTypes.SELECT
        })
        .then(rows => {
            funciones = rows
        });
        return res.json({
            data: [
                funciones
            ]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in get_funcion_pelicula',
            data: error
        });
    }
}

module.exports.getFunciones = getFunciones;
module.exports.getOneFuncion = getOneFuncion;
module.exports.get_funcion_pelicula = get_funcion_pelicula;
module.exports.crear_funcion = crear_funcion;
module.exports.borrar_funcion = borrar_funcion;