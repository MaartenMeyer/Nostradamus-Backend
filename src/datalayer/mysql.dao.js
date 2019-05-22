const sql     = require('mysql');
const config  = require('../config/appconfig');

const logger    = config.logger;
const dbconfig  = config.dbconfig;

module.exports = {
  executeQuery: (query, callback) => {
    sql.connect(dbconfig, err => {

      if (err) {
        logger.error('Error connecting: ', err.toString());
        callback(err, null);
        sql.close()
      }

      if (!err) {
        new sql.Request().query(query, (err, result) => {

          if (err) {
            logger.error('error', err.toString());
            callback(err, null);
            sql.close()
          }

          if (result) {
            callback(null, result);
            sql.close()
          }
        })
      }
    })
  }
};
