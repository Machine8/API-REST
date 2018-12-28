const mongoose = require('mongoose');
const express = require('express')
const app = express()
const fs = require('fs');
const _ = require('underscore');

const Usuario = require('../models/usuario')
const Contenido = require('../models/contenido')

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.post('/usuario/:id', function (req, res) {
  let id = req.params.id
  res.json({
    id
  })
});

/*app.post('/usuario', function (req, res) {
  res.contentType("application/json")
  let body = req.body;
  if(body.nombre === undefined){
    res.status(400).json({
      ok:false ,
      mensaje:'the name is necesarry'
    });
  }else{
    res.json({
      persona:body
    });
  }

});*/




//FindAllUsers

app.get('/usuario', function (req, res) {
   let start = req.query.start || 0;
   start = Number(start);

   let finish = req.query.finish || 2;
    finish = Number(finish);

  Usuario.find({})
  .skip(start)
  .limit(finish)
  .exec( (err, usuarioDB) => {
    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.json({

      usuario:usuarioDB
    });

  });



});


//filtrar datos
app.get('/usuarios', function (req, res) {
   let start = req.query.start || 0;
   start = Number(start);

   let finish = req.query.finish || 0;
    finish = Number(finish);

  Usuario.find({estado:true}, 'nombre email google estado ')
  .skip(start)
  .limit(finish)
  .exec( (err, usuarioDB) => {
    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    Usuario.count({estado:true}, (err,conteo) =>{

      res.json({
      usuario:usuarioDB,
      cantidad: conteo
      });

    });

    });



});



//obtener por propiedad
app.get('/usuario/:role', function (req, res) {
  res.contentType("application/json")
  let body = req.body;
  let role = req.params.role;

  Usuario.find({role:role}, (err, usuarioDB) => {
    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.send({

      usuario:usuarioDB
    });

  });



});

app.post('/usuario', (req, res)  => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    nickname: body.nickname,
    role: body.role
  });




  usuario.save( (err, usuarioDB) =>{

    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.json({
       ok: true,
       usuario: usuarioDB
    });
  });

});


// actualizar
app.put('/usuario/:id', function (req, res) {
  res.contentType("application/json");
  let id = req.params.id;
  //let body = req.body;
  let body = _.pick( req.body, ['nombre','email','img','role','estado']);

// uderscore plugin


Usuario.findByIdAndUpdate( id, body, {new:true, runValidators:true}, (err, usuarioDB) => {
  if( err ){
    return res.status(400).json({
      ok:false ,
      err
    });
  }

  res.json({
    ok:true,
    usuario:usuarioDB
  });

});

//http response_code



});





//create context

app.post('/created', (req, res)  => {
  let body = req.body;

  let usuario = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    nickname: body.nickname,
    role: body.role

  });




  usuario.save( (err, usuarioDB) =>{

    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.json({
       ok: true,
       usuario: usuarioDB
    });

    let contenido = new Contenido({
      author: usuario._id,
      nombreUser:usuario.nombre,
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


    });

  });

});


//buscar por propiedad

app.get('/post/usuario', async (req, res) => {
  res.contentType("application/json")
let id = req.params.id;



  await Contenido.find(id)
  .select('titulo')
  .populate('Usuario')
  .select('nombre').
  exec(function (err, usuarioDB) {



    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    }

    res.send({

    post:usuarioDB
    });

});



});


//delete Usuario
app.delete('/usuario/:id', function (req, res) {

  let id = req.params.id;


Usuario.findByIdAndRemove( id, (err, usuarioKill) => {
  if( err ){
    return res.status(400).json({
      ok:false ,
      err
    });
  };

  if(!usuarioKill){
    return res.status(400).json({
      ok:false ,
      err:{
        message:'User no Found, it is dead ;)'
      }
    });
  }
  console.log('kill user');
  res.json({
    ok:true,
    usuario:usuarioKill
  });

});

//http response_code



});


//actualizar  estado   y eliminar virtualmente user

app.delete('/usuario/estado/:id', function (req, res) {

  let id = req.params.id;
  let cambioEstado ={
    estado:false
  }

Usuario.findByIdAndUpdate( id,cambioEstado,{new:true}, (err, estado) => {
  if( err ){
    return res.status(400).json({
      ok:false ,
      err
    });
  };

  if(!estado){
    return res.status(400).json({
      ok:false ,
      err:{
        message:'User no Found, it is dead ;)'
      }
    });
  }
  console.log('estado cambiado');
  res.json({
    ok:true,
    usuario:estado
  });

});

//http response_code



});

module.exports=app;
