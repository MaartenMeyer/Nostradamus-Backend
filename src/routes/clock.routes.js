const express                   = require("express");
const router                    = express.Router();
const logger                    = require("../config/appconfig").logger;
const clockController           = require("../controllers/clock.controller");
const authenticationController  = require("../controllers/authentication.controller");


router.post("/clocking", authenticationController.validateToken, clockController.clockHandler);
router.post("/breaking", authenticationController.validateToken, clockController.breakHandler);

module.exports = router;