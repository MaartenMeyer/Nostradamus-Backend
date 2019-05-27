module.exports = {
  logger: require("tracer").colorConsole({
    format: [
      "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
      {
        error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})"
      }
    ],

    dateformat: "HH:MM:ss.L",
    preprocess: function(data) {
      data.title = data.title.toUpperCase();
    },
    level: "info, error"
  })
};
