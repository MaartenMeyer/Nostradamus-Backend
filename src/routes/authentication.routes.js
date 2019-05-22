const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");

// Authentication routes
router.post("/register", AuthenticationController.registerUser);
router.post("/login", AuthenticationController.loginUser);
router.get("/users", AuthenticationController.getAll);

module.exports = router;
