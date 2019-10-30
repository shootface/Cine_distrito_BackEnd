const sq = require('sequelize');
const poo = require('../database');
const Empleado = require('../models/empleado');
//GET------------------------------------------------------------
async function getContratos(req,res){
    try {
        const contratos = await Empleado.contrato.findAll();
        res.json({
            data: contratos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getContratos',
            data: error
        });
    }
};
async function getOneContrato(req,res){
    const { id } = req.params;
    try {
        const con = await Empleado.contrato.findOne({
            where:{
                id
            }
        });
        res.json({
            data: con
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneContrato',
            data: error
        });
    }
};
//---------------------------------------------------------------
//POST-----------------------------------------------------------
async function crear_contrato(req,res){
    const {
        id,
        v_tipocontrato,
        d_iniciocontrato,
        i_salario
    } = req.body;
    try {
        let newCli = await Empleado.contrato.create({
            v_tipocontrato,
            d_iniciocontrato,
            i_salario
        });
        if (newCli){
            return res.json({
                message:'Contrato created successfully',
                data: newCli
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in crear_contrato',
            data: error
        });
    };
};
//---------------------------------------------------------------
module.exports.getContratos = getContratos;
module.exports.getOneContrato = getOneContrato;
module.exports.crear_contrato = crear_contrato;