const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: process.env.DB,
    databasePassword: process.env.DB_PASSWORD
  }