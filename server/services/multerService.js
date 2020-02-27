const multer = require("multer");
const store = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function(req, file, cb) {
    let image =  Date.now() + "." + file.originalname;
    console.log("file.originalname", file.originalname);
    console.log("img", image);
    
    cb(null, image);
    req.body.image = ''
  }
});

const upload = multer({ storage: store });

module.exports = upload;