/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

module.exports ={
    DB_URL : env.DB_URL_PINCODE  
};
