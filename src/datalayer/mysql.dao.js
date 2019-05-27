const mysql     = require('mysql');
const logger    = require("tracer").colorConsole();

// If online database doesn't work these are the settings for the online database.
let database = mysql.createConnection({
  host:         process.env.DB_HOST,
  user:         process.env.DB_USER,
  password:     process.env.DB_PASSWORD,
  databasename: 'nostradamus',
  insecureAuth: true
});

// Connection with database.
database.connect( (error) => {
  console.log('Connection pending...');
  if (error){
    console.log(error);
    return error;
  }

  else {
    console.log('Connected with database!')
  }
});

module.exports = database;