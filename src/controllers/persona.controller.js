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

module.exports.getPersonas = getPersonas;