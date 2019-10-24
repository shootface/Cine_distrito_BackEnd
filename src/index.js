const express = require('express');
const morgan = require('morgan');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//starting the serve
app.listen(app.get('port'), () => {
    console.log('server on port ',app.get('port'));
})

const con = 'postgres://vislvvzieyztkh:8ff6283e69e09c2f8a3ce9756a0f17a98c977b06bc347639d9eb56f8f15a54a8@ec2-54-243-238-226.compute-1.amazonaws.com:5432/dgrs5s3ml954l';