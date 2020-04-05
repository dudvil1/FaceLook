module.exports = (sql) => {

  const find = (table, key, userKey, callback) => {
    console.log("dbManeger: find call()");

    const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;
    
    sql.getOne(query,callback)

  };

  return {
    find: find
  }
}
