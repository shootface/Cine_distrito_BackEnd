const sq = require('sequelize');
const poo = require('../database');
const Funciones = require('../models/funciones');
const fs = require('fs')

async function getPeliculas(req,res){
    try {
        const peliculas = await Funciones.pelicula.findAll();
        res.json({
            data: peliculas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getPeliculas',
            data: error
        });
    }
};
async function getOnePelicula(req,res){
    const { id } = req.params;
    try {
        const pel = await Funciones.pelicula.findOne({
            where:{
                id
            }
        });
        res.json({
            data: pel
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOnePelicula',
            data: error
        });
    }
};
async function crear_pelicula(req,res){
    console.log(req.file);
    const {
        v_nombre,
        i_duracion,
        tx_sinapsis
    } = req.body;
    try {
        let newPel = await Funciones.pelicula.create({
            v_nombre,
            i_duracion,
            tx_sinapsis,
            v_foto: req.file.originalname
        });
        if(newPel){
            return res.json({
                message:'Pelicula creada successfully',
                data: newPel
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
async function borrar_pelicula(req,res){
    const { id } = req.params;
    try {
        const pel = await Funciones.pelicula.findOne({
            where:{
                id
            }
        });
        fs.unlinkSync('images/'+pel.v_foto);
        await Funciones.pelicula.destroy({
            where:{
                id
            }
        });
        res.json({
            message: 'Pelicula deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in borrar_funcion',
            data: error
        });
    }
};

module.exports.getPeliculas = getPeliculas;
module.exports.getOnePelicula = getOnePelicula;
module.exports.crear_pelicula = crear_pelicula;
module.exports.borrar_pelicula = borrar_pelicula;