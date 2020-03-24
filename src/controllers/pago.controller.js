const sq = require('sequelize');
const poo = require('../database');
//const Pago = require('../models/pago');
const Multiplex = require('../models/multiplex');
const Reserva = require('../models/reserva');
const Persona = require('../models/persona');
const Empleado = require('../models/empleado');

async function calculo_factura(req,res){
    const {
        pk_reserva,
        fk_persona
    } = req.body;
    const cliente = Persona.cliente.findOne({
        where:{
            fk_persona
        }
    })
    const boletas = Reserva.sillaReservada.findAll({
        where:{
            fk_reserva:pk_reserva
        }
    });
    const snacks = Reserva.snackReservada.findAll({
        where:{
            fk_reserva:pk_reserva
        }
    });
    let precio_general = 0;
    let precio_preferencial = 0;
    let precio_snacks = 0;
    let puntos_ganados = 0;
    let puntos_acumulados = cliente.i_numpuntos;
    //BOLETAS
    for(i=0;i<boletas.length;i++){
        console.log('loop');
        puntos_acumulados = puntos_acumulados + 10;
        if (boletas[i].v_tipo == 'general'){
            precio_general = precio_general + 11000;
        }else if(boletas[i].v_tipo == 'preferencial'){
            precio_preferencial = precio_preferencial + 15000;
        }
    }
    //SNACKS
    for(i=0;snacks.length;i++){
        puntos_acumulados = puntos_acumulados + 5;
        precio_snacks = percio_snacks + (snacks[i]*snacks[i].i_precio);
    }
    //Calculo subtotal
    let subtotal = precio_general + precio_preferencial + precio_snacks;
    //Descuento puntos
    if(puntos_acumulados>100){
        subtotal = subtotal - 11000;
    }
    //Aplicacion descuento para empleados
    try {
        const em = await Empleado.empleado.findOne({
            where: {
                fk_persona
            }
        });
        const descuento = em.n_descuento;
        subtotal = subtotal - (subtotal*(descuento/100));
    } catch (error) {
        console.log("el cliente no es empleado");
    }
    //Calculo del IVA
    const iva = subtotal*0.19;
    const total = subtotal + iva;
    return {
        'precio_general':precio_general,
        'precio_preferencial':precio_preferencial,
        'precio_snacks':precio_snacks,
        'subtotal':subtotal,
        'iva':iva,
        'total':total,
        'puntos_acumulados':puntos_acumulados,
        'puntos_ganados':puntos_ganados
    }
};
//Falta realizar Pagoview para hacer el envio de los datos cuando 
//se realice la peticion al servidor

module.exports.calculo_factura = calculo_factura;