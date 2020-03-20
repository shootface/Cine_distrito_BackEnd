const qe = require('querystring');
//const key = qe.generate(2048);
module.exports = {
    port: 8888 || process.env.PORT  ,
    db: process.env.DATABASE_URL || 'postgres://vislvvzieyztkh:8ff6283e69e09c2f8a3ce9756a0f17a98c977b06bc347639d9eb56f8f15a54a8@ec2-54-243-238-226.compute-1.amazonaws.com:5432/dgrs5s3ml954l',
    dbdavid: 'postgres://osvscqwomjmdkr:513517adc582b816705a1c38c932f4e4a43e7c856e0080340c5d7249bf3f0ccd@ec2-23-21-186-85.compute-1.amazonaws.com:5432/d7q5fo2h3d7eqe',
    token_secret: 'motherFucker'
    //k_public: key.public
}