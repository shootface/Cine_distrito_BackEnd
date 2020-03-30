const jwt = require('jsonwebtoken');
const config = require('../config');

function auth(req,res,next){
    const token = req.header('authtoken');
    console.log(token)
    if(!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token,config.token_secret);
        req.pk_numero_identificacion = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
        console.log(error);
    }
};

module.exports.auth = auth;