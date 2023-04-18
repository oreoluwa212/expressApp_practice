//middleware
const moment = require("moment");

const logger = (req, res, next) => {
  console.log("I'm a middleware");
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}`
  );
  next();
};


module.exports = logger;