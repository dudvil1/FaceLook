module.exports = (sql, logger) => {

  const find = (table, key, userKey, callback) => {
    const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;
    logInfo(logger, query, "find")
    sql.getOne(query, callback)
  };

  return {
    find: find
  }
}

function logInfo(logger, query, funcName) {
  logger.info(`Success in BaseRepo query ${query}`, { data: { function: funcName } });
}

function logError(logger, error, funcName) {
  logger.error(`Error in BaseRepo `, { err: error, data: { function: funcName } });
}

