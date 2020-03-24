const sq = require('sequelize');
const poo = new sq(
        'dgrs5s3ml954l',
        'vislvvzieyztkh',
        '8ff6283e69e09c2f8a3ce9756a0f17a98c977b06bc347639d9eb56f8f15a54a8',
        {
            host: 'ec2-54-243-238-226.compute-1.amazonaws.com',
            dialect: 'postgres',
            dialectOptions: {
                ssl: true
            },
            pool:{
                max:5,
                min:0,
                require: 30000,
                idle: 10000
            },
            logging: false,
        },
    );
//const pool = new Pool({
//    connectionString: process.env.DATABASE_URL || config.db,
 //   ssl: true
//});
module.exports = poo;