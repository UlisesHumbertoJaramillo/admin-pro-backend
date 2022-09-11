/**
 *
 * /api/todo/uploads
 *
 *
 */
const { Router } = require("express");

const router = Router();
//validations

const { check } = require("express-validator");
const { fileUploads, returnImage } = require("../Controllers/uploads");

const { validateFields } = require("../Middlewares/validate-fields");
const { validateJWT } = require("../Middlewares/validate-jwt");

//endpoints
router.post("/:type/:id", [validateJWT], fileUploads);

router.get("/:type/:photo", [], returnImage);

module.exports = router;
