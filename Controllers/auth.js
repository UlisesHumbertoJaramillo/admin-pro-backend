const { response } = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt')

const login = async (req,res=response)=>{
    const {email,password} = req.body;

    try {
        const userDB = await user.findOne({email});
        //verificar email
        if (!userDB) {
            return res.status(404).json({
                ok:false,
                msg:'correo o contraseña no validos'
            })
        }
        //verificar contraseña
        const valilPassword = bcrypt.compareSync(password+'',userDB.password);

        if(!valilPassword){
            return res.status(404).json({
                ok:false,
                msg:'constraseña no valida'
            })
        }

        //generar el token - JWT
        const token = await generateJWT(userDB.id)

        res.status(200).json({
            ok:true,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}


module.exports = {login}