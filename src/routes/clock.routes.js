const express                   = require("express");
const router                    = express.Router();
const clockController           = require("../controllers/clock.controller");
const authenticationController  = require("../controllers/authentication.controller");



router.post("/clocking", clockController.clockHandler);

// router.post("/clocking",authenticationController.validateToken, clockController.clockoff);

module.exports = router;