const express = require('express');
const morgan = require('morgan');
const app = express();

//settings
app.set('port', 8888 || process.env.PORT );
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('images'));
app.use(express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authtoken");
    next();
});
// routes
app.use(require('./routes/index'));
app.use('/empleados',require('./routes/empleados'));
app.use('/cliente',require('./routes/cliente'));
app.use('/contratos',require('./routes/contratos'));
app.use('/empleMulti',require('./routes/empleMulti'));
app.use('/personas',require('./routes/personas'));
app.use('/login',require('./routes/login'));
app.use('/funciones',require('./routes/funciones'));
app.use('/peliculas',require('./routes/peliculas'));
app.use('/salas',require('./routes/salas'));
app.use('/reserva',require('./routes/reserva'));
app.use('/funcionesSala',require('./routes/funcion_sala'));
app.use('/snack',require('./routes/snacks'));
app.use('/pago',require('./routes/pagos'));

module.exports = app;