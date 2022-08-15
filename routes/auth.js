/*
    Route: /api/login
*/


const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require('../Controllers/auth');
const { validateFields } = require('../Middlewares/validate-fields');

const router = Router();


router.post('/',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login)




module.exports = router;