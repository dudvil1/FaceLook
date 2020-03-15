module.exports = (sql, connectionString, mongoose, baseRepo) => {
  function addTag(tag, callback) {
    console.log("dbManeger: addTag call()");

    baseRepo.find("Tags", "Text", tag.tags, result => {
      if (!result) {
        tag.tag_id = new mongoose.Types.ObjectId();
        const query = `INSERT INTO Tags
                       VALUES( '${tag.tag_id}', '${tag.tags}')`;

        sql.add(connectionString, query, (success) => {
          if (success) {
            callback(tag)
          }
          else {
            callback(undefined)
          }
        });
      }
      else {
        tag.tag_id = result.tag_id
        callback(tag);
      }
    });
  }

  return {
    addTag
  };
}


