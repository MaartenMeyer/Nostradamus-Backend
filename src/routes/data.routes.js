// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const dataController            = require("../controllers/data.controller");

router.get("/data/:userId", dataController.getDataOfUser);
router.get("/users/:companyId", dataController.getUsersOfCompany);
router.get("/accountType/:userId", dataController.getAccountTypeOfUser);
router.get("/status", authenticationController.validateToken, dataController.getServerStatus);
router.post("/overview", dataController.getUserOverview);

module.exports = router;