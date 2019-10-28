const sq = require('sequelize');
const empleadaMultiplex = require('./empleado');

const multiplex = sq.define('multiplex',{
    id:{
        type: sq.INTEGER,
        primaryKey: true
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
    tableName: 'multiplex'
});

const sala = sq.define('sala',{
    id:{
        type: sq.INTEGER,
        primaryKey: true
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
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'sala'
});

const silla = sq.define('silla',{
    id:{
        type: sq.INTEGER,
        primaryKey: true
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
        type: sq.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'silla'
});
//Relaciones
empleadaMultiplex.belongsTo(multiplex,{foreingKey:'fk_persona', sourceKey:'fk_persona',onDelete: 'CASCADE'});
multiplex.hasMany(sala,{foreingKey:'fk_multiplex',sourceKey:'id',onDelete:'CASCADE'});
sala.belongsTo(multiplex,{foreingKey:'fk_multiplex',sourceKey:'id',onDelete:'CASCADE'});
sala.hasMany(silla,{foreingKey:'fk_sala',sourceKey:'id',onDelete:'CASCADE'});
silla.belongsTo(sale,{foreingKey:'fk_sala',sourceKey:'id',onDelete:'CASCADE'});

module.exports = multiplex,sala,silla;