const logger        = require("../config/appconfig").logger;
// const secretKey     = require("../config/appconfig").secretkey;
const jwt           = require("jsonwebtoken");
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");
const bcrypt        = require("bcryptjs");

saltRounds = 10;

const postalCodeValidator = new RegExp("^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$");
const phoneValidator      = new RegExp("^06(| |-)[0-9]{8}$");
const mailValidator       = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const passwordValidator   = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$");

module.exports = {
  registerUser: (req, res, next) => {
    logger.info("registerUser is called.");
    const user = req.body;

    try {
      assert.equal(typeof user.firstName, "string", "firstName is required.");
      assert.equal(typeof user.lastName, "string", "lastName is required.");
      assert.equal(typeof user.dateOfBirth, "string", "dateOfBirth is required.");
      assert.equal(typeof user.accountType, "integer", "A valid accountType is required.");
      assest.equal(typeof user.userNumber, "integer", "A valid userNumber is required.");
      assert(mailValidator.test(user.emailAddress), "A valid mailAddress is required.");
      assert(passwordValidator.test(user.password), "A valid password is required.");

      const hash = bcrypt.hashSync(req.body.password, saltRounds);

      const query =
        `INSERT INTO [DBUser] (FirstName, LastName, DateOfBirth, EmailAddress, Password)` +
        `VALUES ('${user.firstName}', '${user.lastName}', ` +
        `'${user.dateOfBirth}','${user.emailAddress}', '${hash}')` +
        `; SELECT SCOPE_IDENTITY() AS UserId`;

      database.executeQuery(query, (err, rows) => {
        if (err) {
          const errorObject = {
            message: "Something went wrong with the database.",
            code: 500
          };
          next(errorObject);
        }
        if (rows) {
          res.status(200).json({ result: rows.recordset });
        }
      });

    } catch (ex) {
      const errorObject = {
        message: "Validation fails: " + ex.toString(),
        code: 500
      };
      return next(errorObject);
    }
  },

  loginUser: (req, res, next) => {
    logger.info("loginUser called");
    const user = req.body;

    const query = `SELECT Password, UserId FROM [DBUser] WHERE EmailAddress='${user.emailAddress}'`;

    database.executeQuery(query, (err, rows) => {
      if (err) {
        const errorObject = {
          message: "Something went wrong with the database.",
          code: 500
        };
        next(errorObject);
      }

      if (rows) {
        logger.info(rows.recordset);

        if (
          rows.recordset.length === 1 && bcrypt.compareSync(req.body.password, rows.recordset[0].Password)
        ) {
          logger.info("Password match, user logged id.");
          logger.trace(rows.recordset);

          const payload = {
            UserId: rows.recordset[0].UserId
          };
          jwt.sign(
            { data: payload },
            secretKey,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {

              if (err) {
                const errorObject = {
                  message: "Could not generate JWT.",
                  code: 500
                };
                next(errorObject);
              }

              if (token) {
                res.status(200).json({
                  result: {
                    token: token
                  }
                });
              }
            }
          );
        }

        else {
          const errorObject = {
            message:
              "No Access: email does not exist or password is wrong!",
            code: 401
          };
          next(errorObject);
        }
      }
    });
  },

  validateToken: (req, res, next) => {
    logger.info("validateToken is called.");
    const authHeader = req.headers.authorization;
    const token = authHeader.substring(7, authHeader.length);


    if (!authHeader) {
      errorObject = {
        message: "No Authorization!",
        code: 401
      };
      logger.warn("Validate token failed: ", errorObject.message);
      return next(errorObject);
    }

    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        errorObject = {
          message: "not authorized!",
          code: 401
        };

        logger.warn("Validate token failed: ", errorObject.message);
        next(errorObject);
      }

      logger.trace("payload", payload);

      if (payload.data && payload.data.UserId) {
        logger.debug("token is valid", payload);
        req.userId = payload.data.UserId;
        next();
      }

      else {
        errorObject = {
          message: "UserId is missing!",
          code: 401
        };
        logger.warn("Validate token failed: ", errorObject.message);
        next(errorObject);
      }
    });
  },

  getAll: (req, res, next) => {
    logger.info("getAll called");

    const query = `SELECT * FROM [DBUser]`;

    database.executeQuery(query, (err, rows) => {
      if (err) {
        const errorObject = {
          message: "Something went wrong in the database.",
          code: 500
        };
        next(errorObject);
      }

      if (rows) {
        res.status(200).json({ result: rows.recordset });
      }
    });
  }
};
