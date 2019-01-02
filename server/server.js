require('./config/config');

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//milldware antes que se ejecute las peticiones los datos pasan por aquiii

// parse application/x-www-form-urlencoded
// esto hace que procese cualquier payload desde postman
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/index'));// exportar todas las rutas del archivo index.js


app.get('/', function (req, res) {
  res.send('Hello World')
});

// conected to dataBase
//mongoose.connect('mongodb://localhost:27017/cafe', (err, res) =>{
mongoose.connect(process.env.URLDB, (err, res) =>{
     if (err) throw err;

     console.log('dataBase In line');
});

app.listen(process.env.PORT, ()=>{
  console.log('running on port 4000');
})

/*function parseJWT (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-','+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};*/
