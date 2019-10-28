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
        type: sq.STRING(128)
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
    timestamps: false,
    freezeTableName: true,
    tableName: 'cliente'
}); 

//Relaciones
persona.hasMany(cliente,{foreingKey:'fk_persona', sourceKey:'pk_cedula',onDelete: 'CASCADE'});
persona.hasMany(empleado,{foreingKey:'fk_persona', sourceKey:'pk_cedula',onDelete: 'CASCADE'});
empleado.belongsTo(persona,{foreingKey:'fk_persona', sourceKey:'pk_cedula',onDelete: 'CASCADE'});
cliente.belongsTo(persona,{foreingKey:'fk_persona', sourceKey:'pk_cedula',onDelete: 'CASCADE'});

module.exports = persona,cliente;