const sq = require('sequelize');
const poo = require('../database');

const snack = poo.define('snack',{
    id: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    v_tipo: {
        type: sq.STRING(50)
    },
    v_nombre: {
        type: sq.STRING(50)
    },
    tx_descripcion: {
        type: sq.TEXT
    },
    i_precio: {
        type: sq.INTEGER
    },
    i_puntosofrecidos: {
        type: sq.INTEGER
    },
    i_cantidad: {
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'snack'
});

module.exports.snack = snack;