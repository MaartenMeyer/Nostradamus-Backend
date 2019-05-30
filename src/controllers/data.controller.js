// The used libraries from node_modules.
const logger = require("../config/appconfig").logger;
const database = require("../datalayer/mysql.dao");

module.exports = {
    getUserData: (req, res, next) => {
        logger.info('getUserData is called')
        const id = req.params.userId;

        const query = `SELECT c.companyId, c.companyName, uc.userId, u.firstName FROM nostradamus.company c
        INNER JOIN nostradamus.user_company uc ON c.companyId = uc.companyId
        INNER JOIN nostradamus.user u ON uc.userId = u.UserId WHERE u.UserId=${id};`

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
                    res.status(200).json({ result: rows })
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