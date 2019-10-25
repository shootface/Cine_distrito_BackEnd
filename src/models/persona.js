const sq = require('sequelize');
const { poo } = require('../database');
const cliente = require('./cliente')

const persona = sq.define('personas',{
    pk_cedula:{
        type: sq.INTEGER,
        primaryKey: true
    },
    v_primernombre:{
        type: sq.STRING(100)
    },
    v_segundonombre:{
        type: sq.STRING(100)
    },
    v_primerapellido:{
        type: sq.STRING(100)
    },
    v_segundoapellido:{
        type: sq.STRING(100)
    },
    i_telefono:{
        type: sq.INTEGER
    },
    v_direccion:{
        type: sq.STRING(100)
    },
    pass:{
        type: sq.STRING(128)
    }
},{
    timestamps: false
}
);
persona.hasMany(cliente,{foreingKey:'fk_persona', sourceKey:'pk_cedula'});
cliente.belongsTo(persona,{foreingKey:'fk_persona', sourceKey:'pk_cedula'});
module.exports = persona;