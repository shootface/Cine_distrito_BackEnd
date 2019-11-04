const sq = require('sequelize');
const poo = require('../database');
const empleado = require('./empleado');

const persona = poo.define('persona',{
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
        type: sq.STRING(128),
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'persona'
}
);

const cliente = poo.define('cliente',{
    fk_persona:{
        type: sq.INTEGER,
        primaryKey: true,
        references:{
            model: persona,
            key:'pk_cedula'
        }
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
    timestamps: false,
    freezeTableName: true,
    tableName: 'cliente'
}); 

module.exports.persona = persona;
module.exports.cliente = cliente;