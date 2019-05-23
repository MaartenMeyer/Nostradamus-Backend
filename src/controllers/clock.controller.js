const logger        = require("../config/appconfig").logger;
const database      = require("../datalayer/mysql.dao");
const assert        = require("assert");

module.exports = {
    clockin: (req, res, next)=>{
        logger.info("Clocking in was called")

    },

    clockoff: (req,res,next)=>{
        logger.info("Clocking off was called")

    },

    clockHandler: (req,res,next)=>{
        logger.info("Clockinghandler was called")
    }
};