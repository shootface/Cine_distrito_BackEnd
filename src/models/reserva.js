const sq = require('sequelize');
const poo = require('../database');
const Persona = require('./persona');
const Multiplex = require('./multiplex');
const Funciones = require('./funciones');
const Snack = require('./snack');

const reserva = poo.define('reserva', {
    id: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    v_estado: {
        type: sq.STRING(50),
        values: ['En proceso','cancelada','Cancelada','en proceso']
    },
    t_inicioreserva: {
        type: sq.DATE
    },
    fk_persona: {
        type: sq.INTEGER,
        reference: {
            model: Persona.persona,
            key: 'pk_cedula'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'reserva'
});

const sillaReservada = poo.define('silla_reservada',{
    id: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    v_estado: {
        type: sq.STRING(50),
        values: ['enproceso','En proceso','reservada', 'Reservada']
    },
    fk_silla: {
        type: sq.INTEGER,
        reference: { 
            model: Multiplex.silla,
            key: 'id'
        }
    },
    fk_funcion_sala: {
        type: sq.INTEGER,
        reference: {
            model: Funciones.funcionSala,
            key: 'id'
        }
    },
    fk_reserva: {
        type: sq.INTEGER,
        reference: {
            model: reserva,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'silla_reservada'
});

const snackReservada = poo.define('snack_reserva',{
    fk_reserva: {
        type: sq.INTEGER,
        reference: {
            model: reserva,
            key: 'id'
        }
    },
    fk_snack: {
        type: sq.INTEGER,
        reference: {
            model: Snack.snack,
            key: 'id'
        }
    },
    i_cantidad: {
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'snack_reserva'
});

module.exports.reserva = reserva;
module.exports.sillaReservada = sillaReservada;
module.exports.snackReservada = snackReservada;
