//External Lib Import
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

//Storage
const multerStorage = multer.memoryStorage();

//Image File Filter
const avataFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Type" }, false);
  }
};

//Image Upload
const imageUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: avataFileFilter,
});

const resizeImg = async (req, res, next) => {
  if (!req.file) return next();
  const folderName = req.body.folderName || "unknown";
  const imgWidth = req.body.imgWidth || 250;
  const imgHeight = req.body.imgHeight || 250;

  const directory = `public/${folderName}`;

  if (!fs.existsSync(directory)) {
    shell.mkdir("-p", directory);
  }

  const fileExt = path.extname(req.file.originalname);
  const formetFileName =
    req.file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "-" +
    Date.now() +
    fileExt;

  try {
    await sharp(req.file.buffer)
      .resize(Number(imgWidth), Number(imgHeight))
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(`${directory + "/" + formetFileName}`));

    req.file.fileUrl = `http://localhost:8080/${folderName}/${formetFileName}`;
    req.file.path = `/${folderName + "/" + formetFileName}`;

    next();
  } catch (e) {
    CreateError(e.message, e.status);
  }
};

module.exports = {
  resizeImg,
  imageUpload,
};
