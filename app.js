// The used libraries from node_modules.
                              require('dotenv').config();
const express               = require("express");

// The connection with the classes.
const logger                = require("./src/config/appconfig").logger;
const authenticationRoutes  = require("./src/routes/authentication.routes");
const clockRoutes           = require("./src/routes/clock.routes");
const workRoutes            = require("./src/routes/work.routes");
const dataRoutes            = require("./src/routes/data.routes");

const app   = express();
const port  = process.env.PORT || 3000;

app.use(express.json());

// The app's starting point.
app.all("*", (req, res, next) => {
  const { method, url } = req;
  logger.info(`${method} ${url}`);
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

// Looking for comparisons between endpoints in these classes.
app.use("/api", authenticationRoutes);
app.use("/api", clockRoutes);
app.use("/api", workRoutes);
app.use("/api", dataRoutes);



// If endpoint does not exist.
app.all("*", (req, res, next) => {
  const { method, url } = req;
  const errorMessage = `${method} ${url} does not exist.`;

  const errorObject = {
    message: errorMessage,
    code: 404,
    date: new Date()
  };

  next(errorObject);
});

// The error handler.
app.use((error, req, res, next) => {
  logger.error("Error handler: ", error.message.toString());
  res.status(error.code).json(error);
});

// Standard message when starting the app (npm start).
app.listen(port, '0.0.0.0', () => logger.info(`Welcome to the app, use port ${port} for access.`));

module.exports = app;