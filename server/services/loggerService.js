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

  const logger = createLogger({
    handleExceptions: true,
    format: format.combine(

      format.json(),
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.printf(
        info => {
          const { location, data } = info[Symbol.for('splat')][0]
          const locationString = location ? `Location - ${location}` : ''
          const objString = data ? `data - ${JSON.stringify(data)}` : '';
          return `${info.timestamp}| ${info.level}: ${JSON.stringify(info.message)}\t${locationString}\t${objString}\n`
        }
      )
    ),
    transports: [dailyRotateFileTransport, new transports.Console({ level: 'warn' })]
  });

  function stream() {
    logger.stream = {
      write: message => {
        logger.info(message);
      }
    };
  }
  function info(message, obj) {
    logger.info(message, obj);
  }
  function warn(message, obj) {
    logger.warn(message, obj);
  }
  function error(message, obj) {
    logger.error(message, obj);
  }
  return { info, warn, error, stream };
};
