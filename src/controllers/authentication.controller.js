// The used libraries from node_modules.
const logger        = require("../config/appconfig").logger;
const assert        = require("assert");

// The connection with the classes.
const jwt           = require("jsonwebtoken");
const database      = require("../datalayer/mysql.dao");
const bcrypt        = require("bcryptjs");

saltRounds = 10;

// Regex for extra check
const emailValidator      = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const dateValidator       = new RegExp('^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$');

module.exports = {
  registerUser: (req, res, next) => {
    logger.info("registerUser is called.");

    const user = req.body;
    logger.info(user);

    // Verifying the information in the request body.
    try {
      assert.equal(typeof user.firstName, "string", "A valid firstName is required.");
      assert.equal(typeof user.lastName, "string", "A valid lastName is required.");
      assert.equal(typeof user.userName, "string", "A valid userName is required.");

      assert(dateValidator.test(user.dateOfBirth), "A valid dateOfBirth is required.");
      assert(emailValidator.test(user.emailAddress), "A valid mailAddress is required.");

      assert.equal(typeof user.accountType,  "number","A valid accountType is required.");
      assert.equal(typeof user.password, "string", "A valid password is required");
      assert.equal(typeof user.userNumber, "number", "A valid userNumber is required");

      const hash = bcrypt.hashSync(user.password, saltRounds);

      const query =
          "INSERT INTO `nostradamus`.`user` (`firstName`, `lastName`, `userName`, `dateOfBirth`, `emailAddress`, `password`, `accountType`, `userNumber`) " +
          "VALUES ('" + user.firstName + "', '" + user.lastName + "', '" + user.userName +"', '" + user.dateOfBirth + "', '" + user.emailAddress + "', '" + hash + "','" + user.accountType + "', '" + user.userNumber + "')";
          " LAST_INSERT_ID();";

          // Return error or result.
      database.query(query, (err, rows) => {
        if (err) {
          const errorObject = {
            message: "Something went wrong with the database.",
            code: 500
          };
          next(errorObject);
        }

        if (rows) {
          res.status(200).json({ message: 'User is registered.' });
        }
      });

    } catch (e) {
      const errorObject = {
        message: "Validation fails: " + e.toString(),
        code: 500
      };
      return next(errorObject);
    }
  },

  loginUser: (req, res, next) => {
    logger.info("loginUser is called.");
    const user = req.body;

    const query = "SELECT UserId, password  FROM nostradamus.user where userName = '" + user.userName + "'";

    // Return error or result.
    database.query(query, (err, rows) => {
      if (err) {
        logger.warn(err);
        const errorObject = {
          message: "Something went wrong with the database.",
          code: 500
        };
        next(errorObject);
      }

      if (rows) {

        if (
            rows.length === 1 && bcrypt.compareSync(req.body.password, rows[0].password)
        ) {

          logger.info(rows);
          logger.info("Password match, user logged id.");

          const payload = {
            UserId: rows[0].UserId,
            UserName: user.userName,
          };

          logger.info(payload);

          jwt.sign(
            { data: payload },
            'secretKey',
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
                  message: "Login succeeded!",
                  token: token
                });
              }
            }
          );
        }

        else {
          const errorObject = {
            message:
              "No Access: userName does not exist or password is wrong!",
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

    jwt.verify(token, 'secretKey', (err, payload) => {
      if (err) {
        errorObject = {
          message: "not authorized!",
          code: 401
        };
        next(errorObject);
      }

      logger.trace("payload", payload);

      if (payload.data && payload.data.UserId && payload.data.UserName) {
        req.userId = payload.data.UserId;
        req.userName = payload.data.UserName;
        next();
      }

      else {
        errorObject = {
          message: "UserId is missing!",
          code: 401
        };
        next(errorObject);
      }
    });
  }
};
