//const qe = require('querystring');
const sq = require('sequelize');
const poo = require('../database');
const Persona = require('../models/persona');
const Empleado = require('../models/empleado');
//GET------------------------------------------------------------
async function getEmpleados(req,res){
    try {
        const empleados = await Empleado.empleado.findAll();
        res.json({
            data: empleados
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getEmpleados',
            data: error
        });
    }
};
async function getOneEmpleado(req,res){
    const { fk_persona } = req.params;
    try {
        const em = await Empleado.empleado.findOne({
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
            message: 'Something goes wrong in getOneEmpleado',
            data: error
        });
    }
};
//----------------------------------------------------------------
//POST------------------------------------------------------------
function crear_empleado(req,res){
    const e = poo.transaction( t =>{
        const {
            pk_cedula,
            v_primernombre,
            v_segundonombre,
            v_primerapellido,
            v_segundoapellido,
            i_telefono,
            v_direccion,
            pass,
            n_descuento,
            fk_numcontrato
            } = req.body;
            return newEp = Persona.persona.create({
                pk_cedula,
                v_primernombre,
                v_segundonombre,
                v_primerapellido,
                v_segundoapellido,
                i_telefono,
                v_direccion,
                pass
            },{transaction: t}).then(newEp => {
                return newEm = Empleado.empleado.create({
                    fk_persona:newEp.pk_cedula,
                    n_descuento,
                    fk_numcontrato
                },{transaction: t})
            });
    }).then(result=>{
        return res.json({
            message:'Empleado created successfully',
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
//----------------------------------------------------------------
//GET
module.exports.getEmpleados = getEmpleados;
module.exports.getOneEmpleado = getOneEmpleado;
//POST
module.exports.crear_empleado = crear_empleado;
