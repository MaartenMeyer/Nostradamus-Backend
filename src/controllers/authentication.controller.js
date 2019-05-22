const logger = require("../config/appconfig").logger;
const secretKey = require("../config/appconfig").secretkey;
const jwt = require("jsonwebtoken");
const database = require("../datalayer/mssql.dao");
const assert = require("assert");
const bcrypt = require("bcryptjs");

saltRounds = 10;

// Const RegExp, to validate various data entries.
const postalCodeValidator = new RegExp("^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$");
const phoneValidator = new RegExp("^06(| |-)[0-9]{8}$");
const mailValidator = new RegExp(
  '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
);
const passwordValidator = new RegExp(
  "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"
);

module.exports = {
  // Function to register new user.
  registerUser: (req, res, next) => {
    logger.info("registerUser called");

    // get user information from req.body
    const user = req.body;
    // Validate data.
    try {
      assert.equal(typeof user.firstName, "string", "firstName is required.");
      assert.equal(typeof user.lastName, "string", "lastName is required.");
      assert.equal(typeof user.dateOfBirth, "string", "dateOfBirth is required.");
      assert(mailValidator.test(user.emailAddress), "A valid mailAddress is required.");
      assert(passwordValidator.test(user.password), "A valid password is required.");
      assert.equal(typeof user.accountType, "integer", "A valid accountType is required.");
      assest.equal(typeof user.userNumber, "integer", "A valid userNumber is required");

      // Encrypt password:
      const hash = bcrypt.hashSync(req.body.password, saltRounds);

      // INSERT query
      const query =
        `INSERT INTO [DBUser] (FirstName, LastName, DateOfBirth, EmailAddress, Password)` +
        `VALUES ('${user.firstName}', '${user.lastName}', ` +
        `'${user.dateOfBirth}','${user.emailAddress}', '${hash}')` +
        `; SELECT SCOPE_IDENTITY() AS UserId`;

      // Execute query and return rows.
      database.executeQuery(query, (err, rows) => {
        // process error or result
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

  // Function to login user.
  loginUser: (req, res, next) => {
    logger.info("loginUser called");

    // get user information from req.body
    const user = req.body;

    // SELECT query
    const query = `SELECT Password, UserId FROM [DBUser] WHERE EmailAddress='${
      user.emailAddress
      }'`;
    // execute query and return rows
    database.executeQuery(query, (err, rows) => {
      // process error or result
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
          rows.recordset.length === 1 &&
          bcrypt.compareSync(req.body.password, rows.recordset[0].Password)
        ) {
          logger.info("Password match, user logged id");
          logger.trace(rows.recordset);

          // Create payload for token
          const payload = {
            UserId: rows.recordset[0].UserId
          };
          jwt.sign(
            { data: payload },
            secretKey,
            { expiresIn: 60 * 60 },
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
        } else {
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

  // Function to make new validation token.
  validateToken: (req, res, next) => {
    logger.info("validateToken called");
    // logger.debug(req.headers)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      errorObject = {
        message: "No Authorization!",
        code: 401
      };
      logger.warn("Validate token failed: ", errorObject.message);
      return next(errorObject);
    }
    const token = authHeader.substring(7, authHeader.length);

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
        // User has access. Add UserId from payload to
        // request for every endpoint.
        req.userId = payload.data.UserId;
        next();
      } else {
        errorObject = {
          message: "UserId is missing!",
          code: 401
        };
        logger.warn("Validate token failed: ", errorObject.message);
        next(errorObject);
      }
    });
  },

  // Function to get all users.
  getAll: (req, res, next) => {
    logger.info("getAll called");

    // make query
    const query = `SELECT * FROM [DBUser]`;

    // execute query
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
