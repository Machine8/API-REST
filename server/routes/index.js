const express = require('express')
const app = express()


app.use( require('./usuario'));// exportar metodos del archivo usuario
app.use( require('./contenido'));// exportar metodos del archivo Contenido
app.use( require('./login'));// login
app.use( require('./categorias'));
app.use( require('./producto'));
app.use( require('./upload'));
app.use( require('./viewimages'));


module.exports=app;
