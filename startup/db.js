const logger = require("../logger");
const mongoose = require("mongoose");
const config=require('config')
module.exports = () => {
  const db = process.env.CONNECTION_STRING;
  mongoose
    .connect(db,{
       useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${db}...`))
    .catch((err) => logger.error("DB connection failed:", err));
};
