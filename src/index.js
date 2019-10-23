const express = require('express');
const morgan = require('morgan');
const app = express();

//settings
app.set('port',3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//starting the serve
app.listen(app.get('port'), () => {
    console.log('server on port ',app.get('port'));
})