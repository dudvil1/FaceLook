module.exports = (sql, connectionString, mongoose,baseRepo) => {
  async function addTag(tag, callback) {
    console.log("dbManeger: addTag call()");
  
    baseRepo.find("Tags", "Text", tag.tag, result => {
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
  
  return {
    addTag
  };
}


