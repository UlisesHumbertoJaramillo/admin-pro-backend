const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async()=>{
    try{
        mongoose.connect(process.env.DB_CNN);
        console.log('DB Online')
    }catch(err){
        console.log(err);
        throw new Error('Error al iniciar la BD');
    }
    
}

module.exports = {
    dbConnect
}