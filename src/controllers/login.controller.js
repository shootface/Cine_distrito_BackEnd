const poo = require('../database');
const bs = require('bcryptjs');
const Persona = require('../models/persona');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function login(req,res){
    const {
        pk_cedula,
        pass
    } = req.body;
    try {
        const user = await Persona.persona.findOne({
            where:{
                pk_cedula
            }
        });
        const validPass = await bs.compare(pass,user.pass)
        if (validPass){
            const token = jwt.sign({pk_cedula: pk_cedula},config.token_secret);
            res.header('auth-token',token).json({
                message: 'logged'
            });
        }else{
            res.status(500).json({
                message: 'pass incorrect',
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
