const express = require("express");
const logger = require("./src/config/appconfig").logger;
const authenticationRoutes = require("./src/routes/authentication.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Generic endpoint handler - for all routes
app.all("*", (req, res, next) => {
  const { method, url } = req;
  logger.info(`${method} ${url}`);
  next();
});


// The routes get installed:
app.use("/api", authenticationRoutes);


// Handle endpoint not found.
app.all("*", (req, res, next) => {
  const { method, url } = req;
  const errorMessage = `${method} ${url} does not exist.`;
  logger.warn(errorMessage);
  const errorObject = {
    message: errorMessage,
    code: 404,
    date: new Date()
  };
  next(errorObject);
});

// Error handler
app.use((error, req, res, next) => {
  logger.error("Error handler: ", error.message.toString());
  res.status(error.code).json(error);
});

app.listen(port, () => logger.info(`The magic happens at port ${port}!`));

module.exports = app;