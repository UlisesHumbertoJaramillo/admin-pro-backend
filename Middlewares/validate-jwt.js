const { response } = require("express");
const jwt = require("jsonwebtoken");


const validateJWT =(req,res = response,next)=>{
    //lee el token del header
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'no existe el token'
        })
    }

    try {
        const uid = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'token inválido'
        })
    }


    next();
}


module.exports = {
    validateJWT
}