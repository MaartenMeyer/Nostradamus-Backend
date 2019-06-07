// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const dataController            = require("../controllers/data.controller");

router.get("/data/:userId", dataController.getDataOfUser);
router.get("/status", authenticationController.validateToken, dataController.getServerStatus);

module.exports = router;