/**
 *
 * /api/todo/:ulises
 *
 *
 */
const { Router } = require("express");

const router = Router();

//validations

const { check } = require("express-validator");
const {
  getAll,
  getDocumentsCollections,
} = require("../Controllers/searches.js");

const { validateFields } = require("../Middlewares/validate-fields");
const { validateJWT } = require("../Middlewares/validate-jwt");

//endpoints
router.get("/:search", [validateJWT], getAll);
router.get(
  "/collection/:table/:search",
  [validateJWT],
  getDocumentsCollections
);

module.exports = router;
