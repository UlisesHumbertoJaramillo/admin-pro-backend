const express = require('express')
require('dotenv').config()//lee las variables de entorno en .env


const {dbConnect} = require('./Database/config')
const cors = require('cors')

//////////
const app = express()
const port = process.env.PORT
////////CREACION CONEXION DE BD///////
//mongoDB
//JlaVZXLHhdTpBNkJ
//ulisesjaramillo

dbConnect();
console.log(process.env.PORT)
//Middlewares
//// configurar cors 
app.use(cors());
//lectura y parseo de body
app.use(express.json())//siempre antes de las rutas

//rutas
app.use('/api/users',require('./routes/users'));//Ruta - controlador

app.use('/api/login',require('./routes/auth'));//Ruta - controlador

//escucha
app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})