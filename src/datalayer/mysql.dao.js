const mysql     = require('mysql');
const config  = require('../config/appconfig');
const logger = require("tracer").colorConsole();

// If online database doesn't work these are the settings for the online database
let database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  databasename: 'nostradamus',
  insecureAuth: true
});


database.connect( (error) => {
  console.log('connectiong pending...');
  if (error){
    console.log(error);
    return
  } else {
    console.log('Connected with database')
  }
});

module.exports = database;