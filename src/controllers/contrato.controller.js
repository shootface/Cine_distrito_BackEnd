const sq = require('sequelize');
const poo = require('../database');
const Empleado = require('../models/empleado');
//GET------------------------------------------------------------
async function getContratos(req,res){
    console.log(req.pk_cedula);
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
            id,
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
//DELETE---------------------------------------------------------
async function borrar_contrato(req,res){
    const {
        id
    } = req.params;
    try {
        await Empleado.contrato.destroy({
            where:{
                id
            }
        });
        res.json({
            message: 'Contrato deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in borrar_contrato',
            data: error
        });
    }
}
//---------------------------------------------------------------
//UPDATE---------------------------------------------------------
async function actualizar_contrato(req,res){
    const {
        id
    } = req.params;
    const {
        v_tipocontrato,
        d_iniciocontrato,
        i_salario
    } = req.body;
    try {
        const contrato = await Empleado.contrato.findOne({
            where:{
                id
            }
        });
        const updateC = await contrato.update({
            v_tipocontrato,
            d_iniciocontrato,
            i_salario
        })
        res.json({
            message: "Contrato Updated Successfully",
            data: updateC
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in actualizar_contrato',
            data: error
        });
    }
}
//---------------------------------------------------------------
module.exports.getContratos = getContratos;
module.exports.getOneContrato = getOneContrato;
module.exports.crear_contrato = crear_contrato;
module.exports.borrar_contrato = borrar_contrato;
module.exports.actualizar_contrato = actualizar_contrato;