const sq = require('sequelize');
const poo = require('../database');

const empleado = poo.define('empleado',{
    fk_persona:{
        type: sq.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    n_descuento:{
        type: sq.DOUBLE
    },
    fk_numcontrato:{
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'empleado'
}
);

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
    tableName: 'contrato'
});

const empleadoMultiplex = poo.define('empleado_multiplex',{
    id:{
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_persona:{
        type: sq.INTEGER
    },
    fk_multiplex:{
        type: sq.INTEGER
    },
    f_transferencia:{
        type: sq.DATE
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'empleado_multiplex'
});
//Relaciones
//empleado.belongsTo(persona,{foreingKey:'fk_persona', sourceKey:'pk_cedula'});
empleado.belongsTo(empleadoMultiplex,{foreingKey:'fk_persona', sourceKey:'fk_persona'});
empleado.belongsTo(contrato,{foreingKey:'fk_numcontrato',sourceKey:'id',onDelete: 'CASCADE'})
contrato.hasMany(empleado,{foreingKey:'fk_numcontrato',sourceKey:'id',onDelete: 'CASCADE'});
empleadoMultiplex.hasMany(empleado,{foreingKey:'fk_persona', sourceKey:'fk_persona'});

module.exports = empleado,contrato,empleadoMultiplex;