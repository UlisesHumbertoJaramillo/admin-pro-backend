/*

    Ruta: /api/users


*/


const { Router } = require('express');
const {getUsers,createUser,updateUser,deleteUser} = require('../Controllers/users');
//validador
const { check } = require('express-validator');
const {validateFields} = require('../Middlewares/validate-fields');
const { validateJWT } = require('../Middlewares/validate-jwt');

const router = Router();

//endpoints
router.get('/',validateJWT, getUsers);
//arreglo de middlewares
router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validateFields,
], createUser);

router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validateFields,
], updateUser);

router.delete('/:id',validateJWT,deleteUser);

module.exports = router;