const express                   = require("express");
const router                    = express.Router();
const clockController           = require("../controllers/clock.controller");


router.post("/clockin", clockController.clockin);
router.post("/clockoff", clockController.clockoff);

module.exports = router;