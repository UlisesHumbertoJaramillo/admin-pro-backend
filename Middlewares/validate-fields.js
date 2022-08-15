const { response} = require('express');
//validation result
const {validationResult} = require('express-validator');


const validateFields = (req,res = response,next)=>{
    //ya paso por el midleware y le agregó al req toda la informacion de los errores detectados.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            ok:false,
            errors:errors.mapped()
        })

    }
    next();
}

module.exports = {validateFields};