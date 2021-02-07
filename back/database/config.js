const mysql = require('mysql');
require('dotenv').config();

const config = {
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const connection = mysql.createPool(config);

module.exports = connection;

