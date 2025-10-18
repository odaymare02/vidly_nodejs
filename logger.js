// const winston = require('winston');
// require('winston-mongodb');
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console({ format: winston.format.simple() }),
//     new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'log/info.log', level: 'info' }),
//     new winston.transports.File({ filename: 'log/combined.log' })
//   ]
// });

// module.exports = logger;
const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),

    // سجل كل شيء في MongoDB
    new winston.transports.MongoDB({
      db: process.env.CONNECTION_STRING || 'mongodb://localhost/vidly-logs', // قاعدة البيانات
      collection: 'appLogs',                    // اسم الكولكشن
      level: 'info',                        // المستوى الأدنى للتسجيل مشان يسجل كل الاشياء
      tryReconnect: true
    }),

    // سجل فقط الأخطاء في ملف
    new winston.transports.File({ filename: 'log/error.log', level: 'error' })
  ]
});

module.exports = logger;
