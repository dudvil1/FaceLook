module.exports = (nodeServices) => {
  const { multer } = nodeServices;

  const store = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/images");
    },
    filename: function (req, file, cb) {
      let image = Date.now() + "." + file.originalname;
      cb(null, image);
      req.image = image;
    }
  });

  const upload = multer({ storage: store });

  return upload;
}