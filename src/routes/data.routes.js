// The used libraries from node_modules.
const express                   = require("express");
const router                    = express.Router();

// The connection with the classes.
const authenticationController  = require("../controllers/authentication.controller");
const dataController            = require("../controllers/data.controller");

router.get("/data/:userId", dataController.getDataOfUser);
router.get("/users/:companyId", dataController.getUsersOfCompany);
router.get("/status", authenticationController.validateToken, dataController.getServerStatus);
router.get("/overview/usernumber/:userNumber", dataController.getUserOverviewByUserNumber);
// router.get("/overview/lastname/:lastname", dataController.getUserOverviewByLastName);
// router.get("/overview/date/:date", dataController.getUserOverviewByDate);

module.exports = router;