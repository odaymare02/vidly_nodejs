const logger = require('../logger');

module.exports=(err,req,res,next)=>{
    logger.error(err.message, { metadata: err });
      console.error("Error:", err.message);
    const statusCode=err.statusCode||500;
    const message = statusCode === 500 ? "Something failed." : err.message;
    res.status(statusCode).json({ error: message });
};