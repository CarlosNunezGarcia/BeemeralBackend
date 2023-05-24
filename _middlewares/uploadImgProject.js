const multer = require("multer");

function uploadImage(folder) {

  const storage = multer.diskStorage({
    
    destination: `../client/./public/assets/images/${folder}`,
    //destination: `./public/images/${a}`,

    filename: function (req, file, callback) {

      //el nombre del archivo se compone del prefijo "Id" seguido
      //de la fecha en la que se creó en milisegundos y se le concatena
      //el nombre y la extensión del archivo original:
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).any();

  return upload;
}

module.exports = uploadImage;
