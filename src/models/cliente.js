const sq = require('sequelize');
const { poo } = require('../database');

const cliente = sq.define('cliente',{
    fk_persona:{
        type: sq.INTEGER,
        primaryKey: true
    },
    i_numpuntos:{
        type: sq.INTEGER
    },
    i_numtarjeta:{
        type: sq.STRING(50)
    },
    d_fechapuntos:{
        type: sq.STRING(50)
    }
},{
    timestamps: false
}); 
module.exports = cliente;