module.exports = (sql, connectionString, mongoose, baseRepo) => {
  function addTag(tagText, callback) {
    console.log("dbManeger: addTag call()");

    baseRepo.find("Tags", "Text", tagText, result => {
      if (result) {
        tag.tag_id = new mongoose.Types.ObjectId();
        const query = `INSERT INTO Tags
                       VALUES( '${tag.tag_id}', '${tagText}')`;

        sql.add(connectionString, query, callback)
      }
      else
        callback({});
    });
  }

  return {
    addTag
  };
}


