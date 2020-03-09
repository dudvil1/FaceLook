module.exports = (sql, connectionString) => {

  const find = async (table, key, userKey, callback) => {
    console.log("dbManeger: find call()");

    const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;

    await sql.query(connectionString, query, (err, rows) => {
      if (rows == null) rows = [];

      callback(rows);
    });

  };

  return {
    find: find
  }
}
