const logger        = require("../config/appconfig").logger;
// const secretKey     = require("../config/appconfig").secretkey;
const jwt           = require("jsonwebtoken");
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");
const bcrypt        = require("bcryptjs");

saltRounds = 10;

// Regex voor check
const emailValidator      = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const dateValidator       = new RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))');

module.exports = {
  registerUser: (req, res, next) => {
    logger.info("registerUser is called.");

    // user informatie uit req.body halen
    const user = req.body;
    logger.info(user);

    // Verifieer dat de juiste velden aanwezig zijn.
    try {
      assert.equal(typeof user.firstName, "string", "A valid firstName is required.");
      assert.equal(typeof user.lastName, "string", "A valid lastName is required.");
      assert(dateValidator.test(user.dateOfBirth), "A valid dateOfBirth is required.");
      assert(emailValidator.test(user.emailAddress), "A valid mailAddress is required.");
      assert.equal(typeof user.accountType,  "number","A valid accountType is required.");
      assert.equal(typeof user.password, "string", "A valid password is required");
      assert.equal(typeof user.userNumber, "number", "A valid userNumber is required");

      const hash = bcrypt.hashSync(user.password, saltRounds);

      const query =
          "INSERT INTO `nostradamus`.`user` (`firstName`, `lastName`, `dateOfBirth`, `emailAddress`, `password`, `accountType`, `userNumber`) " +
          "VALUES ('" + user.firstName + "', '" + user.lastName + "', '" + user.dateOfBirth + "', '" + user.emailAddress + "', '" + hash + "','" + user.accountType + "', '" + user.userNumber + "')"
      " LAST_INSERT_ID();";

      logger.info(query);

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
          res.status(200).json("User is registered");
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
    logger.info("loginUser is called.");
    const user = req.body;

    // const query = `SELECT Password, UserId FROM user WHERE EmailAddress = '${user.emailAddress}'`;

    const query = "SELECT UserId, password  FROM nostradamus.user where emailAddress = '" + user.emailAddress + "'"

    logger.info(query)

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
        logger.info(rows);

        if (
            rows.length === 1 &&
            bcrypt.compareSync(req.body.password, rows[0].password)
        ) {
          logger.info("Password match, user logged id.");
          logger.info(rows[0].UserId);

          const payload = {
            UserId: rows[0].UserId
          };

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
                  token: token ,
                  message: "LOGIN SUCCESFULL!"
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
};
