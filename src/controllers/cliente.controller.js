const sq = require('sequelize');
const poo = require('../database');
const bs = require('bcryptjs');
const Persona = require('../models/persona');

//POST------------------------------------------------------------
function crear_cliente(req,res){
    const e = poo.transaction( async(t) =>{
        const {
            pk_numero_identificacion,
            v_primernombre,
            v_segundonombre,
            v_primerapellido,
            v_segundoapellido,
            i_telefono,
            v_direccion,
            v_pass,
            fk_tipo_documento,
            v_correo_electronico,
            v_foto
            } = req.body;
            //Hash password
            const salt = await bs.genSalt(10);
            const hashPass = await bs.hash(v_pass,salt);
            return newEp = await Persona.persona.create({
                pk_numero_identificacion,
                v_primernombre,
                v_segundonombre,
                v_primerapellido,
                v_segundoapellido,
                i_telefono,
                v_direccion,
                v_pass : hashPass,
                fk_tipo_documento,
                v_correo_electronico,
                v_foto
            },{transaction: t}).then(async(newEp) => {
                return newEm = await Persona.cliente.create({
                    fk_persona:newEp.pk_numero_identificacion,
                    i_numpuntos:0,
                    i_numtarjeta:0,
                    d_fechapuntos: ""
                },{transaction: t})
            });
    }).then(result=>{
        return res.json({
            message:'Cliente created successfully',
            body: result,
            data: e
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message: 'Something goes wrong in crear_empleado',
            data: err
        });
    });
};

async function getOneCliente(req,res){
    const { fk_persona } = req.params;
    try {
        const em = await Persona.cliente.findOne({
            where: {
                fk_persona
            }
        });
        res.json({
            data: em
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneCliente',
            data: error
        });
    }
};

module.exports.crear_cliente = crear_cliente;
module.exports.getOneCliente = getOneCliente;