/*

    Ruta: /api/medics


*/

const { Router } = require("express");

const router = Router();

//validations

const { check } = require("express-validator");
const {
  getMedic,
  createMedic,
  updateMedic,
  deleteMedic,
} = require("../Controllers/medics");
const { validateFields } = require("../Middlewares/validate-fields");
const { validateJWT } = require("../Middlewares/validate-jwt");

//endpoints
router.get("/", getMedic);
//arreglo de middlewares
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hid", "La referencia del hospital es necesaria").not().isEmpty(),
    check("hid", "El id del Hospital debe ser válido").isMongoId(),
    validateFields,
  ],
  createMedic
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hid", "La referencia del hospital es necesaria").not().isEmpty(),
    check("hid", "El id del Hospital debe ser válido").isMongoId(),
    validateFields,
  ],
  updateMedic
);

router.delete("/:id", [validateJWT], deleteMedic);

module.exports = router;
