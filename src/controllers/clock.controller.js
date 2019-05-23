const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");

module.exports = {
    clockin: (req, res, next)=>{
        logger.info("Clocking in was called")

        // hier komt in het request een binnen.
        const clock = req.body

        const query =
            "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + clock.userNumber + "',now(),'" + clock.branchId + "','" + clock.departmentId + "')";


        database.query(query, (err, rows) => {
            // verwerk error of result
            if (err) {
                const errorObject = {
                    message: 'Something went wrong in the database.',
                    code: 500
                }
                next(errorObject)
            }
            if (rows) {
                res.status(200).json({ result: rows.recordset})
            }
        })
    },

    clockoff: (req,res,next)=>{
        logger.info("Clocking off was called")

    },

    clockHandler: (req,res,next)=>{
        logger.info("Clockinghandler was called")
    }
};