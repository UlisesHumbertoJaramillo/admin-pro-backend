const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");
const fs = require("fs");

const fileUploads = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;
  //validate types
  const validTypes = ["hospitals", "medics", "users"];
  if (!validTypes.includes(type)) {
    return res.statusCode(400).json({
      ok: false,
      msg: "El tipo no es válidp, tiene que ser (hospitals, medics o users)",
    });
  }
  //validate exist file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .statusCode(400)
      .json({ ok: false, msg: "no hay ningún archivo" });
  }
  //file procesing
  const file = req.files.image;
  const cutName = file.name.split(".");
  const fileExtention = cutName[cutName.length - 1];

  //validate extention
  const validExtention = ["png", "jpg", "jpeg", "gif"];
  if (!validExtention.includes(fileExtention)) {
    res.statusCode(400).json({
      ok: false,
      msg: "La extencion no es válida",
    });
  }

  //generate name of file
  //use uuid

  const fileName = `${uuidv4()}.${fileExtention}`;
  //path to store image
  const path = `./uploads/${type}/${fileName}`;
  //update image
  updateImage(type, id, path, fileName);

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al procesar la imagen",
      });
    }
    res.json({
      ok: true,
      msg: "file uploaded",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const photo = req.params.photo;

  const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);
  //default image
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    res.sendFile(path.join(__dirname, `../uploads/noimage.jpg`));
  }
};

module.exports = {
  fileUploads,
  returnImage,
};
