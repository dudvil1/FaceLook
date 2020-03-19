module.exports = () => {
  const { createLogger, format, transports } = require("winston");
  require("winston-daily-rotate-file");
  const fs = require("fs");
  const path = require("path");

  const logDir = "logs";
  const datePatternConfiguration = {
    default: "YYYY-MM-DD",
    everHour: "YYYY-MM-DD-HH",
    everMinute: "YYYY-MM-DD-THH-mm"
  };
  numberOfDaysToKeepLog = 30;
  fileSizeToRotate = 1;

  const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-FaceLook.log`,
    datePattern: datePatternConfiguration.everHour,
    zippedArchive: true,
    maxSize: `${fileSizeToRotate}m`,
    maxFiles: `${numberOfDaysToKeepLog}d`
  });
 const colors = {
    error: "red",
    warn: "darkred",
    info: "black",
    http: "green",
    sql: "blue",
    debug: "gray" }

  const logger = createLogger({
    handleExceptions: true,
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.printf(
        info =>
          `${info.timestamp}| ${info.level}: ${JSON.stringify(info.message)}`
      ) 
    ),
    transports: [dailyRotateFileTransport,new transports.Console({ level: 'warn' })]
  });

  function stream() {
    logger.stream = {
      write: message => {
        logger.info(message);
      }
    };
  }
  function info(message) {
    logger.info(message);
  }
  function info(message, obj) {
    logger.info(message, {
      obj
    });
  } 
  function warn(message) {
    logger.warn(message);
  }
  function warn(message, obj) {
    logger.warn(message, {
      obj
    });
  }
  function error(message) {
    logger.error(message);
  }
  function error(message, obj) {
    logger.error(message, {
      obj
    });
  }
  return { info, warn, error, stream };
};
