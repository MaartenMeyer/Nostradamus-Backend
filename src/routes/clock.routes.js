const express                   = require("express");
const router                    = express.Router();
const clockController           = require("../controllers/clock.controller");
const authenticationController  = require("../controllers/authentication.controller");
const database                  = require("../datalayer/mysql.dao");
const logger        = require("../config/appconfig").logger;


router.post("/clocking", authenticationController.validateToken, clockController.clockHandler);

// router.post("/clocking",authenticationController.validateToken, clockController.clockoff);

module.exports = router;