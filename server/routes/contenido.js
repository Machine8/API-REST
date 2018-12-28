const express = require('express')
const app = express()
const fs = require('fs');

const Contenido = require('../models/contenido')


app.get('/contenido', function (req, res) {
  res.send('Hello World')
});

app.post('/contenido', (req, res)  => {
  let body = req.body;

  let contenido = new Contenido({
    titulo: body.titulo,
    descripcion: body.descripcion

  });






  contenido.save( (err, contenidoDB) =>{

    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.json({
       ok: true,
       contenido: contenidoDB
    });
  });

});

module.exports=app;
