const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const uploadJsonProyect = (folder) => {
  const storage = multer.diskStorage({
    destination: `public/${folder}`,
    filename: (req, file, cb) => {
      const uniqueFilename = uuidv4();
      cb(null, uniqueFilename + "_" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    const isValidFileType = file.mimetype.startsWith("application/json");
    if (isValidFileType) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JSON files are allowed."));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("project_data");

  return upload;
};

module.exports = uploadJsonProyect;
