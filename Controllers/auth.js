const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-veryfy");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });
    //verificar email
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "correo o contraseña no validos",
      });
    }
    //verificar contraseña
    const valilPassword = bcrypt.compareSync(password + "", userDB.password);

    if (!valilPassword) {
      return res.status(404).json({
        ok: false,
        msg: "constraseña no valida",
      });
    }

    //generar el token - JWT
    const token = await generateJWT(userDB.id);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const token = req.body.token;

  try {
    const { email, name, picture } = await googleVerify(token);
    const userDB2 = await User.findOne({ email });
    let user2;
    if (!userDB2) {
      user2 = new User({
        name: name,
        email: email,
        password: "@@@", //only because its a required parameter
        img: picture,
        google: true,
      });
    } else {
      user2 = userDB2;
      user2.google = true;
    }
    await user2.save(); //save to DB

    //generar el token - JWT
    const token2 = await generateJWT(user2.id);
    res.status(200).json({
      ok: true,
      email,
      name,
      picture,
      token2,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "El token de google no es válido",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  //generar el token - JWT
  const token = await generateJWT(uid);
  res.status(200).json({
    ok: true,
    token,
  });
};
module.exports = { login, googleSignIn, renewToken };
