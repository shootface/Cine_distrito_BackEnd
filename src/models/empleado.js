const sq = require('sequelize');
const poo = require('../database');
const Persona = require('./persona');
const Multiplex = require('./multiplex');

const contrato = poo.define('contrato',{
    id:{
        type: sq.INTEGER,
        primaryKey:true
    },
    v_tipocontrato:{
        type: sq.STRING(100)
    },
    d_iniciocontrato:{
        type: sq.DATE
    },
    i_salario:{
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'contrato',
    modelName: 'contrato'
});

const empleado = poo.define('empleado',{
    fk_persona:{
        type: sq.INTEGER,
        primaryKey: true,
        references:{
            model: Persona.persona,
            key:'pk_cedula'
        }
    },
    n_descuento:{
        type: sq.DOUBLE
    },
    fk_numcontrato:{
        type: sq.INTEGER,
        reference:{
            model: contrato,
            key:'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'empleado',
    modelName: 'empleado'
});

contrato.hasMany(empleado,{foreignKey:'fk_numcontrato',sourceKey:'id'});

const empleadoMultiplex = poo.define('empleado_multiplex',{
    id:{
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_empleado:{
        type: sq.INTEGER,
        references:{
            model: empleado,
            key:'pk_cedula'
        }
    },
    fk_multiplex:{
        type: sq.INTEGER,
        reference:{
            model: Multiplex.multiplex,
            key: 'id'
        }
    },
    f_transferencia:{
        type: sq.DATE
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'empleado_multiplex',
    modelName: 'empleado_multiplex'
});

empleado.hasMany(empleadoMultiplex,{foreignKey: 'fk_empleado', sourceKey: 'fk_persona'});
Multiplex.multiplex.hasMany(empleadoMultiplex,{foreignKey: 'fk_multiplex', sourceKey: 'id'});

module.exports.empleado = empleado;
module.exports.contrato = contrato;
module.exports.empleadoMultiplex = empleadoMultiplex;