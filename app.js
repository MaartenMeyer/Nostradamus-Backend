// The used libraries from node_modules.
                              require('dotenv').config();
const express               = require("express");

// The connection with the classes.
const logger                = require("./src/config/appconfig").logger;
const authenticationRoutes  = require("./src/routes/authentication.routes");
const clockRoutes           = require("./src/routes/clock.routes");
const workRoutes            = require("./src/routes/work.routes");

const app   = express();
const port  = process.env.PORT || 3000;

app.use(express.json());

// The app's starting point.
app.all("*", (req, res, next) => {
  const { method, url } = req;
  logger.info(`${method} ${url}`);
  next();
});

// Enable Cross Origin Resource Sharing to let web applications
// from a different domain access the server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Looking for comparisons between endpoints in these classes.
app.use("/api", authenticationRoutes);
app.use("/api", clockRoutes);
app.use("/api", workRoutes);

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
  res.status(200).json(error);
});

// Standard message when starting the app (npm start).
app.listen(port, () => logger.info(`The magic happens at port ${port}!`));

module.exports = app;