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
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medic = await Medic.findById(id + "");
    if (!medic) {
      return res.status(400).json({
        ok: true,
        msg: "Medico no encontrado",
      });
    }

    const changes = {
      ...req.body,
      user: uid,
    };

    const medicUpdated = await Medic.findByIdAndUpdate(id, changes, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      medicUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

/*
const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id + "");
    if (!hospital) {
      return res.status(400).json({
        ok: true,
        msg: "Hospital no encontrado",
      });
    }

    const changes = {
      ...req.body,
      user: uid,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changes, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      hospitalUpdated,
    });*/

const deleteMedic = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medic = await Medic.findById(id + "");
    if (!medic) {
      return res.status(400).json({
        ok: true,
        msg: "Medico no encontrado",
      });
    }

    await Medic.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Medico eliminado",
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
