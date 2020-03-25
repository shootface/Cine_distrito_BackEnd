const sq = require('sequelize');
const poo = require('../database');
const Multiplex = require('./multiplex');

const pelicula = poo.define('pelicula',{
    id:{
        type: sq.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    v_nombre: {
        type: sq.STRING(150)
    },
    i_duracion: {
        type: sq.INTEGER
    },
    tx_sinapsis: {
        type: sq.TEXT
    },
    v_foto: {
        type: sq.TEXT
    },
    v_genero: {
        type: sq.STRING(100)
    },
    v_clasificacion: {
        type: sq.STRING(100)
    },
    v_reparto: {
        type: sq.STRING(500)
    },
    v_director: {
        type: sq.STRING(100)
    },
    d_fecha_estreno : {
        type: sq.DATE
    },
    v_pais_origen : {
        type: sq.STRING(100)
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'pelicula'
});

const funcion = poo.define('funcion',{
    id:{
        type: sq.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    v_estado:{
        type: sq.STRING(50),
        values:['activa','Activa','inactiva','Inactiva']
    },
    d_proyeccion:{
        type: sq.DATE
    },
    fk_pelicula:{
        type: sq.INTEGER,
        reference:{
            model: pelicula,
            key: 'id'
        }
    },
    t_inicioproyeccion:{
        type: sq.TIME
    },
    t_finproyeccion:{
        type: sq.TIME
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'funcion'
});

const funcionSala = poo.define('funcion_sala',{
    id: {
        type: sq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_funcion: {
        type: sq.INTEGER,
        reference: {
            model: funcion,
            key: 'id'
        }
    },
    fk_sala: {
        type: sq.INTEGER,
        reference: {
            model: Multiplex.sala,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'funcion_sala'
});

funcion.hasMany(funcionSala,{as:'functionS',foreignKey: 'fk_funcion'});
Multiplex.sala.hasMany(funcionSala,{foreignKey: 'fk_sala', sourceKey: 'id'});
//funcionSala.belongsTo(Multiplex.sala);
pelicula.hasMany(funcion,{foreignKey: 'fk_pelicula', sourceKey: 'id'})

module.exports.funcion = funcion;
module.exports.pelicula = pelicula;
module.exports.funcionSala = funcionSala;
