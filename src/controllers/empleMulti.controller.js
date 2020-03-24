const sq = require('sequelize');
const poo = require('../database');
const Persona = require('../models/persona');
const Empleado = require('../models/empleado');
//GET------------------------------------------------------------
async function getEmpleadosMultiplex(req,res){
    try {
        const empleMulti = await Empleado.empleadoMultiplex.findAll();
        res.json({
            data: empleMulti
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getEmpleadosMultiplex',
            data: error
        });
    }
};
async function asignar_empleado(req,res){
    const {
        fk_persona,
        fk_multiplex,
        f_transferencia
    } = req.body;
    try {
        let newEM = await Empleado.empleadoMultiplex.create({
            fk_persona,
            fk_multiplex,
            f_transferencia
        });
        if(newEM){
            return res.json({
                message:'Empleado asignado successfully',
                data: newEM
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong asignar_empleado',
            data: error
        });
    }
};
//----------------------------------------------------------------
module.exports.getEmpleadosMultiplex = getEmpleadosMultiplex;
module.exports.asignar_empleado = asignar_empleado;