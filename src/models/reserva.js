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

//Persona.persona.hasMany(reserva,{});

const sillaReservada = poo.define('silla_reservada',{
    id: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    v_estado: {
        type: sq.STRING(50),
        values: ['en proceso','En proceso','reservada', 'Reservada','cancelada']
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

//sillaReservada.hasMany(Multiplex.silla);
//sillaReservada.hasMany(Funciones.funcionSala);
//sillaReservada.hasMany(reserva);

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

//snackReservada.hasMany(Snack.snack);
//snackReservada.hasMany(reserva);

module.exports.reserva = reserva;
module.exports.sillaReservada = sillaReservada;
module.exports.snackReservada = snackReservada;
