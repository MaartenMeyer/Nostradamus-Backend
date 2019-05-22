module.exports = {
  logger: require("tracer").colorConsole({
    format: [
      "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
      {
        error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})" // error format
      }
    ],
    dateformat: "HH:MM:ss.L",
    preprocess: function(data) {
      data.title = data.title.toUpperCase();
    },
    level: "info"
  }),

  dbconfig: {
    user: "",
    password: "",
    server: "",
    database: "",
    port: 1443,
    driver: "",
    connectionTimeout: 1500,
    options: {
      // 'true' if you're on Windows Azure
      encrypt: false
    }
  },

  // secretkey: process.env.SECRET_KEY
};
