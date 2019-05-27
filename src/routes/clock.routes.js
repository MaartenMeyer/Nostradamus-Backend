// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const clockController           = require("../controllers/clock.controller");

<<<<<<< HEAD
// router.post("/clocking", authenticationController.validateToken, clockController.clockHandler);
router.post("/clocking", clockController.clockHandler);

router.post("/breaking", clockController.breakHandler);
=======
router.post("/clocking", authenticationController.validateToken, clockController.clockHandler);
router.post("/breaking", authenticationController.validateToken, clockController.breakHandler);
>>>>>>> fae45e84b83a95ff3f823230c7fdf36e2a57c193

module.exports = router;