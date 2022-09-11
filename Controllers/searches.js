//express-validator
//controlador de Users
//importamos el modelo de User
const User = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");
//para ayudar con en autocompletado
const { response } = require("express");
//encriptador de contraseñas
const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/jwt");

const getAll = async (req, res) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users, hospitals, medics] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Medic.find({ name: regex }),
  ]);
  res.json({
    ok: true,
    users,
    hospitals,
    medics,
  });
};

const getDocumentsCollections = async (req, res = response) => {
  const table = req.params.table;
  const search = req.params.search;
  const regex = new RegExp(search, "i");
  let data = [];

  switch (table) {
    case "medics":
      data = await Medic.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "users":
      data = await User.find({ name: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla tiene que ser users/medics/hospitals",
      });
  }

  res.status(200).json({
    ok: true,
    resultado: data,
  });
};

module.exports = {
  getAll,
  getDocumentsCollections,
};
