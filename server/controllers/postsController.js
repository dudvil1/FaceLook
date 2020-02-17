function addPost(req, res) {
  
  console.log("addPost call()");
  console.log(req.body);
  
/*   let post = {
    text: req.body.text,
    tags: req.body.tags,
    image: "image",
    location: req.body.location
  }; */

  res.status(201).json({ message: "ok"});
}

module.exports = {
  addPost
};
