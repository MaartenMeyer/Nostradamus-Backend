// The used libraries from node_modules.
const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");

module.exports = {
    activeEmployees: (req,res,next)=>{
        logger.info("activeEmployees is called.")

        const query = "SELECT `nostradamus`.user.firstname, `nostradamus`.clocking_system.userNumber, `nostradamus`.clocking_system.beginTime FROM `nostradamus`.user, `nostradamus`.clocking_system WHERE `nostradamus`.user.userNumber = `nostradamus`.clocking_system.userNumber AND `nostradamus`.clocking_system.endTime IS NULL;";

        database.query(query, (err, rows)=>{
            if (err) {
                const errorObject = {
                    message: 'Something went wrong in the database.',
                    code: 500
                };
                next(errorObject)
            } else {
                logger.info(rows)
                res.status(200).json(rows)
            }
        })
    },
};