// The used libraries from node_modules.
const logger = require("../config/appconfig").logger;
const database = require("../datalayer/mysql.dao");

module.exports = {
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

                    function contains(arr, id) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].branchId === id) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function containsDepartment(arr, id) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].departmentId === id) {
                                return true;
                            }
                        }
                        return false;
                    }

                    let company = {
                        companyId: "",
                        branches: []
                    };

                    company.companyId = rows[0].companyId;

                    for(let i = 0; i < rows.length; i++){
                        let branch = {
                            branchId: "",
                            branchName: "",
                            departments: []
                        };

                        branch.branchId = rows[i].branchId;
                        branch.branchName = rows[i].branchName;

                        if(!contains(company.branches, branch.branchId)){
                            for(let j = 0; j < rows.length; j++){

                                let department = {
                                    departmentId: "",
                                    departmentName: ""
                                };

                                department.departmentId = rows[j].departmentId;
                                department.departmentName = rows[j].departmentName;

                                if(rows[j].branchId === branch.branchId){
                                    if(!containsDepartment(branch.departments, department.departmentId)){
                                        branch.departments.push(department);
                                    }
                                }
                            }

                            branch.departments.sort((a, b) => (a.departmentId > b.departmentId) ? 1 : -1);
                            company.branches.push(branch);
                        }
                    }
                    res.status(200).json(company)
                }

                else {
                    const errorObject = {
                        message: 'Error retrieving data: check if database contains departments and branches.',
                        code: 404
                    };
                    next(errorObject);
                }
            }
        })
    },

    getUsersOfCompany: (req, res, next) => {
        logger.info('getUsersOfCompany is called.');
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

                }

                else {
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
    }
};