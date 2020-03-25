const sq = require('sequelize');
const poo = require('../database');

const Persona = require('../models/persona');

async function getPersonas(req,res){
    try {
        const personas = await Persona.persona.findAll();
        res.json({
            data: personas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getPersonas',
            data: error
        });
    }
};
async function getOnePersona(req,res){
    const { id } = req.params;
    try {
        const pe = await Persona.persona.findOne({
            where: {
                pk_numero_identificacion: id
            }
        });
        res.json({
            data: pe
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneEmpleado',
            data: error
        });
    }
};
//async function 

module.exports.getPersonas = getPersonas;
module.exports.getOnePersona = getOnePersona;