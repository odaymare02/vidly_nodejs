const logger = require("../logger");
const mongoose = require("mongoose");
const config=require('config')
module.exports = () => {
  const db=config.get('db');
  mongoose
    .connect(db)
    .then(() => logger.info(`Connected to ${db}...`))
    .catch((err) => logger.error("DB connection failed:", err));
};
