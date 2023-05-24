const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

let uploadImgUser = (folder) => {

  const storage = multer.diskStorage({
    // Se guarda en la siguiente ruta
    destination: `../client/./public/assets/images/${folder}`,
    filename: function (req, file, cb) {
      // Genera un nombre aleatorio (uuidv4) y le concatena el nombre original y la extensión
      cb(null, uuidv4() + "_" + file.originalname);
    },
  });

  // Solo se puede subir un archivo y ha de ser de tipo imagen
  const upload = multer({
    storage,
    fileFilter: function fileFilter(req, file, cb) {
      let type = file.mimetype.startsWith("image/");
      type ? cb(null, true) : cb(new Error("no es un archivo de tipo imagen"));
    },
  }).single("file");
  
  return upload;
};

module.exports = uploadImgUser;
