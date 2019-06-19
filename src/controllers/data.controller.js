// The used libraries from node_modules.
const logger = require("../config/appconfig").logger;
const database = require("../datalayer/mysql.dao");

module.exports = {
    // Function to get data of the company of the given user id in parsed JSON format
    getDataOfUser: (req, res, next) => {
        logger.info('getDataOfUser is called');
        const id = req.params.userId;

        const query = `SELECT c.companyId, b.branchId, b.branchName, d.departmentId, d.departmentName FROM nostradamus.department d
                            INNER JOIN nostradamus.branch_department bd ON d.departmentId = bd.departmentId
                            INNER JOIN nostradamus.branch b ON bd.branchId = b.branchId
                            INNER JOIN nostradamus.company_branch cb ON b.branchId = cb.branchId
                            INNER JOIN nostradamus.company c ON cb.companyId = c.companyId
                                WHERE c.companyId IN
                                    (SELECT c.companyId FROM nostradamus.company c
                                        INNER JOIN nostradamus.user_company uc ON c.companyId = uc.companyId
                                        INNER JOIN nostradamus.user u ON uc.userId = u.UserId
                                        WHERE u.UserId=${id}
                                    );`;

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Something went wrong with the database.',
                    code: 500
                };
                next(errorObject);
            }
            if (rows) {
                if (rows.length > 0) {

                    /**
                     *
                     * @param {Array} arr branches
                     * @param {number|string} id branchId
                     * @return {boolean} Whether param arr contained param id
                     */
                    function contains(arr, id) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].branchId === id) {
                                return true;
                            }
                        }
                        return false;
                    }
                    /**
                     *
                     * @param {Array} arr departments
                     * @param {number|string} id departmentId
                     * @return {boolean} Whether param arr contained param id
                     */
                    function containsDepartment(arr, id) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].departmentId === id) {
                                return true;
                            }
                        }
                        return false;
                    }

                    // Declaration of object company with companyId and Array named branches
                    let company = {
                        companyId: "",
                        branches: []
                    };
                    // Sets companyId of company to the companyId of the first element of Array rows
                    company.companyId = rows[0].companyId;

                    // Loops through all elements of Array rows
                    for(let i = 0; i < rows.length; i++){
                        // Declaration of object branch with branchId, branchName and Array named departments
                        let branch = {
                            branchId: "",
                            branchName: "",
                            departments: []
                        };
                        // Sets branchId and branchName to the branchId and branchName of element i of Array rows
                        branch.branchId = rows[i].branchId;
                        branch.branchName = rows[i].branchName;

                        // Checks if Array company.branches already contains the branch
                        // If not, adds departments to Array departments in branch, and finally adds branch to company.branches
                        if(!contains(company.branches, branch.branchId)){
                            for(let j = 0; j < rows.length; j++){
                                // Declaration of object department with departmentId and departmentName
                                let department = {
                                    departmentId: "",
                                    departmentName: ""
                                };
                                // Sets departmentId and departmentName to the departmentId and departmentName of element j of Array rows
                                department.departmentId = rows[j].departmentId;
                                department.departmentName = rows[j].departmentName;

                                if(rows[j].branchId == branch.branchId){
                                    // Checks if Array branch.departments already contains the department
                                    // If not, adds department to Array departments in branch
                                    if(!containsDepartment(branch.departments, department.departmentId)){
                                        branch.departments.push(department);
                                    }
                                }
                            }
                            // Sorts departments in branch.departments ascending based on departmentId
                            branch.departments.sort((a, b) => (a.departmentId > b.departmentId) ? 1 : -1);

                            // Adds branch to company.branches
                            company.branches.push(branch);
                        }
                    }
                    res.status(200).json(company)
                } else {
                    const errorObject = {
                        message: 'Error retrieving data: check if database contains departments and branches.',
                        code: 404
                    };
                    next(errorObject);
                }
            }
        })
    },

    getAccountTypeOfUser: (req, res, next) => {
        logger.info('getAccountTypeOfUser is called');
        const id = req.params.userId;

        const query = `SELECT u.accountType FROM nostradamus.user u WHERE u.UserId=${id};`

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Error in database at: SELECT u.accountType FROM nostradamus.user u WHERE u.UserId=${id};',
                    code: 500
                };
                next(errorObject);
            }
            if (rows) {
                res.status(200).json(rows);
            }
        })
    },

    getUsersOfCompany: (req, res, next) => {
        logger.info('getUsersOfCompany is called');
        const id = req.params.companyId;

        const query = `SELECT u.UserId, u.userNumber FROM nostradamus.user u
                            INNER JOIN nostradamus.user_company uc ON u.UserId = uc.userId
                            INNER JOIN nostradamus.company c ON uc.companyId = c.companyId
                            WHERE c.companyId IN
                                    (SELECT c.companyId FROM nostradamus.company c
                                        INNER JOIN nostradamus.user_company uc ON c.companyId = uc.companyId
                                        INNER JOIN nostradamus.user u ON uc.userId = u.UserId
                                        WHERE u.UserId=${id}
                                    );`;

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Something went wrong with the database.',
                    code: 500
                };
                next(errorObject);
            }
            if (rows) {
                if (rows.length > 0) {

                    let users = {
                        users: []
                    };

                    // Loops through all elements of Array rows
                    for (let i = 0; i < rows.length; i++) {

                        let user = {
                            userId: "",
                            userNumber: ""
                        };
                        user.userId = rows[i].UserId;
                        user.userNumber = rows[i].userNumber;

                        users.users.push(user);
                    }
                    res.status(200).json(users);
                } else {
                    const errorObject = {
                        message: 'Error retrieving data: check if database contains users.',
                        code: 404
                    };
                    next(errorObject);
                }
            }
        })
    },

    getServerStatus: (req, res, next) => {
        res.status(200).json({
            status: "Online"
        });
    },

    // Getting all user information for the overview page.
    getUserOverview: (req, res, next) => {
        logger.info('getUserOverview is called');
        const body = req.body;

        const userNumber = body.userNumber;
        const lastName = body.lastName;
        const beginDate = body.beginDate;
        const endDate = body.endDate;

        let query = "";

        if(userNumber != null){
            query = `SELECT u.userNumber, u.lastName, cs.beginTime, cs.endTime FROM nostradamus.clocking_system cs
                    INNER JOIN nostradamus.user u ON cs.userNumber = u.userNumber
                    WHERE u.userNumber = ${userNumber};`;

        }else if(lastName != null){
            query = `SELECT u.userNumber, u.lastName, cs.beginTime, cs.endTime FROM nostradamus.clocking_system cs
                    INNER JOIN nostradamus.user u ON cs.userNumber = u.userNumber
                    WHERE u.lastName = '${lastName}';`;

        }else if(beginDate != null && endDate != null){
            query = `SELECT u.userNumber, u.lastName, cs.beginTime, cs.endTime FROM nostradamus.clocking_system cs
                    INNER JOIN nostradamus.user u ON cs.userNumber = u.userNumber
                    WHERE cs.beginTime >= '${beginDate}' AND cs.endTime <= '${endDate}';`;
        }

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Something went wrong with the database.',
                    code: 500
                };
                next(errorObject);
            }
            if (rows) {
                if (rows.length > 0) {

                    let user = {
                        userNumber: "",
                        lastName: "",
                        clockEntries: []
                    };
                    user.userNumber = rows[0].userNumber;
                    user.lastName = rows[0].lastName;

                    for(let i = 0; i < rows.length; i++){

                        let clock = {
                            beginTime: "",
                            endTime: "",
                            // beginBreak: "",
                            // endBreak: ""
                        };

                        clock.beginTime = rows[i].beginTime;
                        clock.endTime = rows[i].endTime;
                        // clock.beginBreak = rows[i].beginBreak;
                        // clock.endBreak = rows[i].endTime;

                        user.clockEntries.push(clock);
                    }

                    res.status(200).json(user);
                } else {
                    const errorObject = {
                        message: 'Error retrieving data: check if database contains users.',
                        code: 404
                    };
                    next(errorObject);
                }
            }
        })
    }
};