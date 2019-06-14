// The used libraries from node_modules.
const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");

module.exports = {
  clockHandler: (req,res,next)=>{
        logger.info("clockHandler was called.");
        const user = req.body;

        // If there is still a pause clocked in, it is now clocked out
        const query2 = "SELECT 1 FROM nostradamus.break_system WHERE endTime IS NULL AND userNumber = " + user.userNumber + ";";

        database.query(query2, (err, rows)=>{
            if (rows.length > 0){

                let query = "";

                // Checks if request body contains startTime and endTime
                // If only endtime given: set endTime of break to the same endTime
                // Else: updates break to set endTime to now()
                if(user.beginTime == null && user.endTime != null){
                    query = "UPDATE `nostradamus`.`break_system` SET `endTime` = '" + user.endTime + "' WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;";
                } else {
                    query = "UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;";
                }

                database.query(query, (err, rows)=>{
                logger.info("USER ALSO BREAK CLOCKED OFF");
                });
            }
        });

        // select 1 is for faster query searching
        const clock = req.body;

        const query = "SELECT 1 FROM nostradamus.clocking_system WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;";

        // Return error or result.
        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Error in database at SELECT 1 FROM nostradamus.clocking_system',
                    code: 500
                };
                next(errorObject);
            }

            if (rows.length > 0) {

                let query = "";

                // Checks if request body contains startTime and endTime
                // If only endtime given: set endTime of clocking entry to the same endTime
                // Else: update clocking record to set endTime to now()
                if (user.beginTime == null && user.endTime != null) {
                    query = "UPDATE `nostradamus`.`clocking_system` SET `endTime` = '" + user.endTime + "' WHERE (endTime IS null AND userNumber = " + clock.userNumber + ");";
                } else {
                    query = "UPDATE `nostradamus`.`clocking_system` SET `endTime` = now() WHERE (endTime IS null AND userNumber = " + clock.userNumber + ");";
                }

                // Return error or result.
                database.query(query, (err, rows) => {
                    if (err) {
                        const errorObject = {
                            message: 'Error in database at UPDATE nostradamus.clocking_system',
                            code: 500
                        };
                        next(errorObject);
                    }

                    if (rows) {
                        res.status(200).json({ message: 'User is clocked off.' });
                    }
                });
            }else {

                let query = "";

                // Checks if request body contains startTime and endTime
                // If both startTime and endTime given: insert new record with given startTime and endTime
                // If only startTime given: insert new record with given startTime
                // Else: insert new record with startTime set to now()
                console.log("Synchronize clockEntry: " +user.body);
                if (user.beginTime != null && user.endTime != null) {
                    query = "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, endTime, branchId, departmentId) VALUES ('" + user.userNumber + "','" + user.beginTime + "','" + user.endTime +"','" + user.branchId + "','" + user.departmentId + "')";
                } else if (user.beginTime != null && user.endTime == null) {
                    query = "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + user.userNumber + "','" + user.beginTime + "','" + user.branchId + "','" + user.departmentId + "')";
                } else {
                    query = "INSERT INTO nostradamus.clocking_system(userNumber, beginTime, branchId, departmentId) VALUES ('" + clock.userNumber + "',now(),'" + clock.branchId + "','" + clock.departmentId + "')";
                }

                // Return error or result
                database.query(query, (err, rows) => {
                    if (err) {
                        const errorObject = {
                            message: 'Error in database at INSERT INTO nostradamus.clocking_system',
                            code: 500
                        };
                        next(errorObject);
                    }

                    if (rows) {
                        res.status(200).json({ message: 'User is clocked in.' });
                    }
                });
            }
        });
    },

    // Returns clocking_system object if a row is found in database with the given userNumber and with endTime NULL
    // Else: returns 404 status
    // If userNumber is not found, returns 500 status
    clockStatus: (req, res, next) =>{
        logger.info("clockStatus was called.");
        const userNumber = req.params.userNumber;

        const query = "SELECT * FROM nostradamus.clocking_system WHERE userNumber = " + userNumber + " AND endTime IS NULL;";

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Error in database at SELECT 1 FROM nostradamus.clocking_system',
                    code: 500
                };
                next(errorObject);
            }

            if (rows.length > 0) {

                let clockingEntry = {
                    clockingSystemId: "",
                    userNumber: "",
                    beginTime: "",
                    endTime: "",
                    branchId: "",
                    departmentId: ""
                };
                clockingEntry.clockingSystemId = rows[0].clockingSystemId;
                clockingEntry.userNumber = rows[0].userNumber;
                clockingEntry.beginTime = rows[0].beginTime;
                clockingEntry.endTime = rows[0].endTime;
                clockingEntry.branchId = rows[0].branchId;
                clockingEntry.departmentId = rows[0].departmentId;

                res.status(200).json(clockingEntry);
            } else {
                res.status(404).json({ message: 'No clocking entries found with endTime NULL.' });
            }
        });
    },

    breakHandler: (req, res, next)=>{
        logger.info("breakHandler was called.");

        const user      = req.body;

        console.log(user);

        let queryOfflineSync = "";
        if(user.beginTime != null && user.endTime == null){
            queryOfflineSync = "INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`) VALUES ('" + user.userNumber + "','" + user.beginTime + "')";
            // Return error or result.
            database.query(queryOfflineSync, (err, rows) => {
                if (err) {
                    const errorObject = {
                        message: "Error at: INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`) VALUES.",
                        code: 500
                    };
                    next(errorObject)
                }
                res.status(200).json({ message: 'User break clocked in.' })
            })
        }else if(user.beginTime != null && user.endTime != null){
            queryOfflineSync = "INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`, `endTime`) VALUES ('" + user.userNumber + "','" + user.beginTime + "','" + user.endTime + "')";
            // Return error or result
            database.query(queryOfflineSync, (err, rows) => {
                if (err) {
                    const errorObject = {
                        message: 'Error at: INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`, `endTime`) VALUES.',
                        code: 500
                    };
                    next(errorObject);
                }

                if (rows) {
                    res.status(200).json({ message: 'User is clocked in.' });
                }
            });
        }else if(user.beginTime == null && user.endTime != null){
            queryOfflineSync = "UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE (`userNumber` = '" + user.userNumber + "' AND endTime IS NULL);";
            // Return error or result.
            database.query(queryOfflineSync, (err, rows) => {
                if (err) {
                    const errorObject = {
                        message: 'Error at: UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE',
                        code: 500
                    };
                    next(errorObject);
                }

                if (rows) {
                    res.status(200).json({ message: 'User is clocked off.' });
                }
            });
        }else{
            const query = "SELECT 1 FROM nostradamus.clocking_system WHERE userNumber = " + user.userNumber + " AND endTime IS NULL;";
            const query2 = "SELECT * FROM nostradamus.break_system WHERE endTime IS NULL AND userNumber = " + user.userNumber + ";";

            // Return error or result.
            database.query(query, (err, rows) => {
                if (err) {
                    const errorObject = {
                        message: "Something went wrong with the database.",
                        code: 500
                    };
                    next(errorObject);
                }

                // Return error or result.
                database.query(query2, (err, rows2) => {
                    if (err) {
                        const errorObject = {
                            message: "Something went wrong with the database.",
                            code: 500
                        };
                        next(errorObject);
                    }

                    if (rows.length > 0 && rows2.length === 0) {

                        const query =
                            "INSERT INTO `nostradamus`.`break_system` (`userNumber`, `beginTime`) VALUES ('" + user.userNumber + "', now());";

                        // Return error or result.
                        database.query(query, (err, rows) => {
                            if (err) {
                                const errorObject = {
                                    message: "Something went wrong with the database.",
                                    code: 500
                                };
                                next(errorObject)
                            }
                            res.status(200).json({ message: 'User break clocked in.' })
                        })
                    }

                    else if (rows.length === 0) {
                        res.status(500).json({ message: 'User is not clocked in yet.' })
                    }

                    else {

                        const query =
                            "UPDATE `nostradamus`.`break_system` SET `endTime` = now() WHERE (`userNumber` = '" + user.userNumber + "' AND endTime IS NULL);";

                        // Return error or result
                        database.query(query, (err, rows) => {
                            if (err) {
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
    },

    // Returns breaking_system object if a row is found in database with the given userNumber and with endTime NULL
    // Else: returns 404 status
    // If userNumber is not found, returns 500 status
    breakStatus: (req, res, next) => {
        logger.info("breakStatus was called.");
        const userNumber = req.params.userNumber;

        const query = "SELECT * FROM nostradamus.break_system WHERE userNumber = " + userNumber + " AND endTime IS NULL;";

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Error in database at SELECT 1 FROM nostradamus.break_system',
                    code: 500
                };
                next(errorObject);
            }

            if (rows.length > 0) {

                let breakEntry = {
                    breakSystemId: "",
                    userNumber: "",
                    beginTime: "",
                    endTime: ""
                };
                breakEntry.breakSystemId = rows[0].break_systemId;
                breakEntry.userNumber = rows[0].userNumber;
				breakEntry.beginTime = rows[0].beginTime;
				breakEntry.endTime = rows[0].endTime;

                res.status(200).json(breakEntry);
            } else {
                res.status(404).json({ message: 'No break entries found with endTime NULL and userNumber ' + userNumber });
            }
        });
    },

  hoursHandeler: (req,res,next) => {
    logger.info("hoursHandeler is called.");
    const user = req.body;

    const query = "SELECT userNumber, beginTime, endTime FROM nostradamus.clocking_system where userNumber = " + user.userNumber + ";";

    // Returns error or result.
    database.query(query, (err, rows)=>{
      if (err) {
        const errorObject = {
          message: 'Something went wrong in the database.',
          code: 500
        };
        next(errorObject)
      }
      if (rows){
        res.status(200).json({ result: rows})
      }
    })
  },
};