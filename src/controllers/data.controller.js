// The used libraries from node_modules.
const logger = require("../config/appconfig").logger;
const database = require("../datalayer/mysql.dao");

module.exports = {
    // Function to get all departments of the company of the given user id
    getDepartmentsOfCompany: (req, res, next) => {
        logger.info('getUserData is called')
        const id = req.params.userId;

        const query = `SELECT b.branchId, b.branchName, d.departmentId, d.departmentName FROM nostradamus.department d
                            INNER JOIN nostradamus.branch_department bd ON d.departmentId = bd.departmentId
                            INNER JOIN nostradamus.branch b ON bd.branchId = b.branchId
                            INNER JOIN nostradamus.company_branch cb ON b.branchId = cb.branchId
                            INNER JOIN nostradamus.company c ON cb.companyId = c.companyId
                                WHERE c.companyId IN
                                    (SELECT c.companyId FROM nostradamus.company c
                                        INNER JOIN nostradamus.user_company uc ON c.companyId = uc.companyId
                                        INNER JOIN nostradamus.user u ON uc.userId = u.UserId
                                        WHERE u.UserId=${id}
                                    );`

        database.query(query, (err, rows) => {
            if (err) {
                const errorObject = {
                    message: 'Something went wrong in the database.',
                    code: 500
                }
                next(errorObject);
            }
            if (rows) {
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    const errorObject = {
                        message: 'UserId not found.',
                        code: 404
                    }
                    next(errorObject);
                }
            }
        })
    },
};