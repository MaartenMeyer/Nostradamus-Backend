// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const workcontroller            = require("../controllers/work.controller");

router.get("/active", authenticationController.validateToken, workcontroller.activeEmployees);

module.exports = router;