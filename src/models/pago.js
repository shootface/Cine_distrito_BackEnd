const sq = require('sequelize');
const poo = require('../database');
const Persona = require('./persona');
const Reserva = require('./reserva');

const pago = require('pago',{
    pk_numpago: {
        type: sq.INTEGER,
        primaryKey: true
    },
    t_fechapago: {
        type: sq.DATE
    },
    i_subtotalpago: {
        type: sq.INTEGER
    },
    i_totalpago: {
        type: sq.INTEGER
    },
    i_puntosganados: {
        type: sq.INTEGER
    },
    v_metodopago: {
        type: sq.STRING(50)
    },
    fk_cliente: {
        type: sq.INTEGER,
        reference: {
            model: Persona.cliente,
            key: 'fk_persona'
        }
    },
    fk_reserva: {
        type: sq.INTEGER,
        reference: {
            model: Reserva.reserva,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'pago'
});

module.exports.pago = pago;