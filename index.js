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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})