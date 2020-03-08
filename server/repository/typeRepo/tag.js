const mongoose = require("mongoose");
const connectionString = require("../DbConnection");
const sql = require("msnodesqlv8");

async function addTag(tag, callback) {
  console.log("dbManeger: addTag call()");

  find("Tags", "Text", tag.tag, result => {
    if (result.length < 1) {
      tag.tag_id = new mongoose.Types.ObjectId();
      const query = `INSERT INTO Tags
                     VALUES( '${tag.tag_id}', '${tag.tags}')`;
      sql.query(connectionString, query, (err, res) => {
        if (err) console.log("from addtag", err);
        callback(tag);
      });
    } else callback({});
  });
}

module.exports = {
  addTag
};
