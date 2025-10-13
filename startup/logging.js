const logger=require('../logger');
module.exports=()=>{
    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception:", {
        message: err.message,
        stack: err.stack,
      });
      process.exit(1);
    });
    
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection:", { reason });
    });

}
