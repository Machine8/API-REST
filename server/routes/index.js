const express = require('express')
const app = express()


app.use( require('./usuario'));// exportar metodos del archivo usuario
app.use( require('./contenido'));// exportar metodos del archivo Contenido
app.use( require('./login'));// login


module.exports=app;
