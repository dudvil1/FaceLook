

function addPost(req, res) {
  console.log(req.file);
    //console.log(JSON.parse(req.body));
    
  res.send({message: "ok"});
}

module.exports = {
  addPost
};
