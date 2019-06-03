// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const clockController           = require("../controllers/clock.controller");

router.post("/clocking", authenticationController.validateToken, clockController.clockHandler);
router.post("/breaking", authenticationController.validateToken, clockController.breakHandler);
router.get("/hours", clockController.hoursHandeler);

module.exports = router;