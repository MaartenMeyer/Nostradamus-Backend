// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const AuthenticationController  = require("../controllers/authentication.controller");

router.post("/register", AuthenticationController.registerUser);
router.post("/login", AuthenticationController.loginUser);

module.exports = router;

