module.exports = (nodeServices) => {
  const { createLogger, format, transports } = nodeServices;
  
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

  const dailyRotateFileTransport = level =>
    new transports.DailyRotateFile({
      filename: `${logDir}/%DATE%-FaceLook${level}.log`,
      datePattern: datePatternConfiguration.everHour,
      zippedArchive: true,
      maxSize: `${fileSizeToRotate}m`,
      maxFiles: `${numberOfDaysToKeepLog}d`
    });

  const baseFormat = format.combine(
    format.json(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => {
      const { location, data, err } = info[Symbol.for("splat")][0];
      const locationString = location ? `Location - ${location}` : "";
      const errString = err ? `error - ${err}` : "";
      const objString = data ? `data - ${JSON.stringify(data)}` : "";
      return `${info.timestamp}| ${info.level}: ${JSON.stringify(info.messag)} 
                \t${locationString}\t${objString}\n${errString}`;
    }),
  );

  const errorLogger = createLogger({
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-err")]
  });

  const infoLogger = createLogger({
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-info")]
  });

  const dubugLogger = createLogger({
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-dubug")]
  });

  function stream() {
    errorLogger.stream = {
      write: message => {
        errorLogger.info(message);
      }
    };
  }

  function info(message, obj) {
    infoLogger.info(message, obj);
  }

  function error(message, obj) {
    errorLogger.error(message, obj);
  }

  function debug(message, obj) {
    dubugLogger.debug(message, obj);
  }

  return { info, error, debug, stream };
};
