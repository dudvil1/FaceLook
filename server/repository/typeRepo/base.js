const connectionString = require("../DbConnection");
const sql = require("msnodesqlv8");

async function find(table, key, userKey, callback) {
  console.log("dbManeger: find call()");

  const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;

  await sql.query(connectionString, query, (err, rows) => {
    if (rows == null) rows = [];

    callback(rows);
  });
}

module.exports = {
  find
};
