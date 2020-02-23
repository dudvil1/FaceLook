const multer = require("multer");
const store = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function(req, file, cb) {
    let image =  Date.now() + "." + file.originalname;
    cb(null, image);
    req.body.imageUrl = 'C:\\Users\\Dudu\\Desktop\\GitHub\\FaceLook\\server\\public\\uploads\\images' + image;
  }
});

const upload = multer({ storage: store });

module.exports = upload;