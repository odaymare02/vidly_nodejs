require("dotenv").config();
const logger = require("./logger");
const looger=require('./logger');
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 3030;
const server=app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}...`);
});
module.exports=server;