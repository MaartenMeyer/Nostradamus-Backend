const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");

module.exports = {

    clockHandler: (req,res,next)=>{
        logger.info("clockHandler was called.");
        const user = req.body;

        // If there is still a pause clocked in, is is now clocked out
        const query2 = "SELECT 1 FROM nostradamus.break_system WHERE endTime IS NULL AND userNumber = " + user.userNumber + ";";

        database.query(query2, (err, rows)=>{
            if (rows.length > 0){
                const query3 = "UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;";

                database.query(query3, (err, rows)=>{
                    logger.info("USER ALSO BREAK CLOCKED OFF")
                })
            }
        })

        // select 1 is for faster query searching

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
                        res.status(200).json({ message: 'User is clocked off.' });
                    }
                })
            } else {
                const clock = req.body;

                const query =
                    "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + clock.userNumber + "',now(),'" + clock.branchId + "','" + clock.departmentId + "')";

                database.query(query, (err, rows) => {
                    if (err) {
                        const errorObject = {
                            message: 'Something went wrong in the database.',
                            code: 500
                        };
                        next(errorObject)
                    }
                    if (rows) {
                        res.status(200).json({ message: 'User is clocked in.' });
                    }
                });
            }
        })


    },

    breakHandler: (req, res, next)=>{
        logger.info("breakHandler was called")

        const user = req.body;
        const query = "SELECT 1 FROM nostradamus.clocking_system WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;"

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: "Something went wrong with the database.",
                    code: 500
                };
                next(errorObject);
            }

            const breaking = req.body;
            const query2 = "SELECT * FROM nostradamus.break_system WHERE endTime IS NULL AND userNumber = " + breaking.userNumber + ";";

            database.query(query2, (err, rows2)=>{
                if (err) {
                    const errorObject = {
                        message: "Something went wrong with the database.",
                        code: 500
                    };
                    next(errorObject);
                }

                if (rows.length > 0 && rows2.length === 0){
                    const breaking = req.body;

                    const query =
                        "INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`) VALUES ('" + breaking.userNumber + "', now());";

                    database.query(query, (err, rows) =>{
                        if (err){
                            const errorObject = {
                                message: "Something went wrong with the database.",
                                code: 500
                            };
                            next(errorObject)
                        }
                        res.status(200).json({ message: 'User break clocked in.' })
                    })
                } else if (rows.length === 0) {
                    res.status(500).json({ message: 'User is not clocked in yet.' })
                } else {
                    const breaking = req.body;

                    const query =
                        "UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE (`userNumber` = '" + breaking.userNumber + "' AND endTime IS NULL);";

                    database.query(query, (err, rows) =>{
                        if (err){
                            const errorObject = {
                                message: "Something went wrong with the database.",
                                code: 500
                            };
                            next(errorObject)
                        }
                        res.status(200).json({ message: 'User break clocked off.' })
                    })
                }
            });
        });
    }
};