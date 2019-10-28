//const qe = require('querystring');
const persona = require('../models/persona');
const { empleado, contrato, empleadoMultiplex } = require('../models/empleado');

async function getEmpleados(req,res){
    const personas = await persona.findAll();
    res.json({
        data: personas
    });
};
async function crear_empleado(req,res){
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
        try {
            let newp = await persona.create({
                pk_cedula,
                v_primernombre,
                v_segundonombre,
                v_primerapellido,
                v_segundoapellido,
                i_telefono,
                v_direccion,
                pass
            });
            if (newp){
                try {
                    let newEm = await empleado.create({
                        pk_cedula,
                        n_descuento,
                        fk_numcontrato
                    });
                    if (newEm){
                        return res.json({
                            message:'Empleado created successfully',
                            data: newEm
                        });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: 'Something goes wrong',
                        data: error
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Something goes wrong',
                data: error
            });
        }
};
async function crear_contrato(req,res){
    const {
        id,
        v_tipocontrato,
        d_iniciocontrato,
        i_salario
    } = req.body;
    try {
        let newCli = await contrato.create({
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
            message: 'Something goes wrong',
            data: error
        });
    };
};
async function asignar_empleado(req,res){
    const {
        id,
        fk_persona,
        fk_multiplex,
        f_transferencia
    } = req.body;
    try {
        let newEM = await empleadoMultiplex.create({
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
            message: 'Something goes wrong',
            data: error
        });
    }
};
module.exports = getEmpleados,crear_empleado,crear_contrato,asignar_empleado;
//module.exports = crear_empleado,crear_contrato,getEmpleados,asignar_empleado;