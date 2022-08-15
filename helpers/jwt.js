const { response } = require('express')
const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        //sin información sensible
        const payload = {
            uid
        }
        
        jwt.sign({uid}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('no se pudo genera el JWT')
            }else{
                resolve(token);
            }
        })
    })


}

module.exports ={generateJWT}