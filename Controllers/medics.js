//express-validator
//controlador de Médicos
//para ayudar con en autocompletado
const { response } = require("express");
//encriptador de contraseñas
const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/jwt");
const Medic = require("../models/medic");

const getMedic = async (req, res) => {
  const medics = await Medic.find()
    .populate("user", "name")
    .populate("hospital", "name");
  res.status(200).json({
    ok: true,
    medics,
  });
};

const createMedic = async (req, res = response) => {
  const uid = req.uid;
  const hid = req.body.hid; //id del hospital obtenido desde mongoDB
  const medic = new Medic({ user: uid, hospital: hid, ...req.body });
  try {
    const medicDB = await medic.save();
    res.status(200).json({
      ok: true,
      medico: medicDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const updateMedic = async (req, res = response) => {
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

const deleteMedic = async (req, res = response) => {
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
  getMedic,
  createMedic,
  updateMedic,
  deleteMedic,
};
