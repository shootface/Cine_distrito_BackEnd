const poo = require('../database');
const bs = require('bcryptjs');
const Persona = require('../models/persona');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function login(req,res){
    const {
        pk_numero_identificacion,
        v_pass
    } = req.body;
    try {
        const user = await Persona.persona.findOne({
            where:{
                pk_numero_identificacion
            }
        });
        const validPass = await bs.compare(v_pass,user.v_pass)
        if (validPass){
            const token = jwt.sign({pk_numero_identificacion: pk_numero_identificacion},config.token_secret);
            res.status(200).json({
                message: 'logged',
                auth:token
            });
        }else{
            res.status(500).json({
                message: 'pass incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in login',
            data: error
        });
    }
};

module.exports.login = login;
