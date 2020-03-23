module.exports = (sql, connectionString) => {

  const find = (table, key, userKey, callback) => {
    console.log("dbManeger: find call()");

    const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;
    console.log("from find",typeof connectionString);
    
    sql.getOne(connectionString,query,callback)

  };

  return {
    find: find
  }
}
