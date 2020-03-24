const sq = require('sequelize');
const poo = require('../database');
const Empleado = require('./empleado');

const tipo_documento = poo.define('tipo_documento',{
    pk_id_tipo:{
        type: sq.INTEGER,
        primaryKey: true,
    },
    v_tipo:{
        type: sq.STRING(50)
    }
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'tipo_documento'
});

const persona = poo.define('persona',{
    pk_numero_identificacion:{
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
    v_pass:{
        type: sq.STRING(128),
        allowNull: false
    },
    fk_tipo_documento:{
        type: sq.INTEGER,
        allowNull: false,
        references:{
            model: tipo_documento,
            key:'pk_id_tipo'
        }
    },
    v_correo_electronico:{
        type: sq.STRING(100)
    },
    v_foto:{
        type: sq.TEXT
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
module.exports.tipo_documento = tipo_documento;