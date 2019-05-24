const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");

module.exports = {

    clockHandler: (req,res,next)=>{
        logger.info("CLOCKHANDLER WAS CALLED")

        const user = req.body;
        const query = "SELECT * FROM nostradamus.clocking_system WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;"

        database.query(query, (err, rows) => {
            // verwerk error of result
            if (err) {
                const errorObject = {
                    message: 'Something went wrong in the database.',
                    code: 500
                };
                next(errorObject)
            }

<<<<<<< HEAD
            if (rows.length > 0) {
                logger.info(rows + "ER WORD UITGEKLOKT")

                const clock = req.body;

                const query = "UPDATE `nostradamus`.`clocking_system` SET `endTime` = now() WHERE (endTime IS null AND userNumber = " + clock.userNumber + ");"


                database.query(query, (err, rows) => {
                    // verwerk error of result
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
                logger.info(rows + "ER WORD INGEKLOKT")

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
                })
=======
            if (rows) {

                res.status(200).json({ result: rows})

                res.status(200).json("User is clocked in.");

            }
        })
    },

    clockoff: (req,res,next)=>{
        logger.info("Clocking off was called")

        // hier komt in het request een binnen.
        const clock = req.body;

        // const query =
        //     "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + clock.userNumber + "',now(),'" + clock.branchId + "','" + clock.departmentId + "')";

        const query = "UPDATE `nostradamus`.`clocking_system` SET `endTime` = now() WHERE (endTime IS null AND userNumber = " + clock.userNumber + ");"


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
                res.status(200).json({ result: rows})
>>>>>>> 74803f33b12caf88607a68907b754f0db2183baf
            }
        })
    }
};