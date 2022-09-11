//express-validator
//controlador de Hospitales
//importamos el modelo de User
const Hospital = require("../models/hospital");
//para ayudar con en autocompletado
const { response } = require("express");
//encriptador de contraseñas
const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/jwt");

const getHospital = async (req, res) => {
  const hospitals = await Hospital.find().populate("user", "name img");

  res.status(200).json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ user: uid, ...req.body });
  try {
    const hospitalDB = await hospital.save();

    res.status(200).json({
      ok: true,
      msg: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const updateHospital = async (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  try {
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};
