/*

    Ruta: /api/hospitals


*/

const { Router } = require("express");

const router = Router();

//validations

const { check } = require("express-validator");
const {
  getHospital,
  deleteHospital,
  updateHospital,
  createHospital,
} = require("../Controllers/hospitals");

const { validateFields } = require("../Middlewares/validate-fields");
const { validateJWT } = require("../Middlewares/validate-jwt");

//endpoints
router.get("/", getHospital);
//arreglo de middlewares
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del hospital es necesario").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

router.put("/:id", [], updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
