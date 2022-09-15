/*
    Route: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../Controllers/auth");
const { validateFields } = require("../Middlewares/validate-fields");

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("token", "El tooken es obligatorio").not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
