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
      const dataString = data ? `data - ${JSON.stringify(data)}` : "";
      const errorString = err ? `error - ${err}` : "";
      const res = `${info.timestamp}| ${info.level}: ${info["message"]} 
                \t${locationString}\t${dataString}\t${errorString}`;
      return res;
    }),
  );

  const errorLogger = createLogger({
    level: 'error',
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-err")]
  });

  const infoLogger = createLogger({
    level: 'info',
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-info")]
  });

  const dubugLogger = createLogger({
    level: 'debug',
    handleExceptions: true,
    format: baseFormat,
    transports: [dailyRotateFileTransport("-dubug")]
  });

  function stream() {
    errorLogger.stream = {
      write: message => {
        errorLogger.error(message);
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
