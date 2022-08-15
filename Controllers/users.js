//express-validator
//controlador de Users
//importamos el modelo de User
const User = require('../models/user');
//para ayudar con en autocompletado
const { response } = require('express');
//encriptador de contraseñas
const bcrypt = require('bcryptjs');

const {generateJWT} =  require('../helpers/jwt')



const getUsers = async (req, res) => {
    //res.send('Hello World!');
    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        users
    })
};

const createUser = async (req, res = response) => {
    const { name, password, email } = req.body;
    
    
    try {
        //validación del correo
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya existe'
            })
        }

        const user = new User(req.body);

        //antes de guardar en la BD encriptar la contraseña

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password+'',salt);//encryptado se tiene que enviar un string como contraseña(revisar)
        //guardar usuario
        await user.save();//guardado en la BD

         //generar el token - JWT
         const token = await generateJWT(user.password);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }


};

const updateUser = async (req,res=response) => {
    //TODO: Validar token y comprobar si es el usuario correcto

    try {
        const uid = req.params.id;
        //const {name,role,email} = req.body;


        const userDB = await User.findById(uid);
        //si no existe
        if(!userDB){
            res.status(404).json({
                ok:false,
                msg:'El usuario no se encuentra bajo ese id'
            })
        }

        //si existe el usuario
        //actualizaciones

        const {email,password,google,...fields} = req.body;

        if(email !== userDB.email){
            const existEmail = await User.findOne({email});
            if(existEmail){
                return res.status(400).json(
                    {
                        ok:false,
                        msg:'Ya existe ese correo en otro usuario'
                    }
                )
            }
        }
        fields.email=email;

        const usuarioActualizado = await User.findByIdAndUpdate(uid,fields,{new:true}); // encuentra el usuario en la BD y actualiza,{new:true} es para que bongoDB envie el usuaio actualizado
        
        res.status(200).json({
            ok:true,
            usuario:usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"

        })
        
    }

}

const deleteUser = async(req,res=response) =>{

    try {
        const uid = req.params.id;
        //const {name,role,email} = req.body;


        const userDB = await User.findById(uid);
        //si no existe
        if(!userDB){
            res.status(404).json({
                ok:false,
                msg:'El usuario no se encuentra bajo ese id'
            })
        }

        //si existe el usuario
        await User.findByIdAndDelete(uid);
        res.status(200).json({
            ok:true,
            usuario:'usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"

        })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}