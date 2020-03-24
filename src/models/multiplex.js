const sq = require('sequelize');
const poo = require('../database');

const multiplex = poo.define('multiplex',{
    id:{
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },v_nombre:{
        type: sq.STRING(100),
        primaryKey: true
    },
    v_direccion:{
        type: sq.STRING(100)
    },
    v_ciudad:{
        type: sq.STRING(100)
    },
    i_minsalas:{
        type: sq.INTEGER
    },
    i_maxsalas:{
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'multiplex',
    modelName: 'multiplex'
});

const sala = poo.define('sala',{
    id:{
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    i_numsala:{
        type: sq.INTEGER
    },
    i_numpreferencial:{
        type: sq.INTEGER
    },
    i_numgeneral:{
        type: sq.INTEGER
    },
    fk_multiplex:{
        type: sq.INTEGER,
        references:{
            model: multiplex,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'sala',
    modelName: 'sala'
});

multiplex.hasMany(sala,{foreignKey:'fk_multiplex',sourceKey:'id'});

const silla = poo.define('silla',{
    id:{
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pk_numero:{
        type: sq.STRING(3)
    },
    v_tipo:{
        type: sq.STRING(50),
        values:['preferencial','Preferencial','general','General']
    },
    i_orden:{
        type: sq.STRING(50)
    },
    fk_sala:{
        type: sq.INTEGER,
        references:{
            model: sala,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'silla',
    modelName: 'silla'
});

sala.hasMany(silla,{foreignKey:'fk_sala',sourceKey:'id'})

module.exports.multiplex = multiplex
module.exports.sala = sala;
module.exports.silla = silla;