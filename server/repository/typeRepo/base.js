module.exports = (sql) => {

  const find = (table, key, userKey, callback) => {
    const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;
    sql.getOne(query, callback)
  };

  return {
    find: find
  }
}
