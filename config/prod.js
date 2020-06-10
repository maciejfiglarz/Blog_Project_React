const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    username: process.env.MMP_MAIL,
    password: process.env.MMP_PASSWORD,
    database: process.env.MMP_DB,
    databasePassword: process.env.PASSWORD
  }