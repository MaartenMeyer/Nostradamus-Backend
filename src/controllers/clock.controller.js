const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");

module.exports = {

    clockHandler: (req,res,next)=>{
        logger.info("clockHandler was called.");

        // select 1 is for faster query searching
        const user = req.body;
        const query = "SELECT 1 FROM nostradamus.clocking_system WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;"

        // verwerk error of result
        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Something went wrong in the database.',
                    code: 500
                };
                next(errorObject)
            }

            if (rows.length > 0) {

                const clock = req.body;

                const query = "UPDATE `nostradamus`.`clocking_system` SET `endTime` = now() WHERE (endTime IS null AND userNumber = " + clock.userNumber + ");";


                // verwerk error of result
                database.query(query, (err, rows) => {
                    if (err) {
                        const errorObject = {
                            message: 'Something went wrong in the database.',
                            code: 500
                        };
                        next(errorObject)
                    }
                    if (rows) {
                        res.status(200).json("User is clocked off.");
                    }
                })
            } else {
                const clock = req.body;

                const query =
                    "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + clock.userNumber + "',now(),'" + clock.branchId + "','" + clock.departmentId + "')";

                // verwerk error of result
                database.query(query, (err, rows) => {
                    if (err) {
                        const errorObject = {
                            message: 'Something went wrong in the database.',
                            code: 500
                        };
                        next(errorObject)
                    }
                    if (rows) {
                        res.status(200).json("User is clocked in.");
                    }
                });
            }
        })
    },
};