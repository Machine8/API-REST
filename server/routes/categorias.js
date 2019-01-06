const mongoose = require('mongoose');
const express = require('express')
const app = express()
const path = require('path')
const expressHbs = require('express-handlebars');
//importando hbs render

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, '.../public')));
app.use(express.static(path.resolve(__dirname, '.../public')));



const Usuario = require('../models/usuario')
const Categoria = require('../models/categorias')
const { verificaToken }= require('../middlewares/autentificacion')

app.get('/categoria', (req, res) =>{

    Categoria.find({})
    .sort('descripcion')//ordenar por proiedad
    .populate('usuario', 'nombre email')
    .exec( (err, categoriaDB) =>{
      if( err ){
        return res.status(400).json({
          ok:false ,
          err
        });
      }

      res.json({
        categoria:categoriaDB
      })

    /*  res.render('home',{
        categoria: categoriaDB
      });*/

    });

    //res.render('home');
});

app.post('/categoria',verificaToken, (req, res) =>{

        let body = req.body;

        let categoria = new Categoria({
             descripcion:body.descripcion,
             usuario:req.usuario._id
        });

        categoria.save( (err, categoria) =>{
          if( err ){
            return res.status(400).json({
              ok:false ,
              err
            });
          }

          res.json({
            ok:true,
            categoria:categoria
          });
        });
});

app.put('/categoria/:id', (req, res) =>{
    let body = req.body;
    let id = req.params.id;

Categoria.findByIdAndUpdate(id, body, {new:true,runValidators:true}, (err, categoria) =>{
  if( err ){
    return res.status(400).json({
      ok:false ,
      err
    });
  }

  res.json({
    ok:true,
    categoria:categoria
  });
});

});

app.delete('/categoria/:id', (req, res) =>{
  let id = req.params.id;

  Categoria.findByIdAndRemove( id, (err, categoria) =>{
    if( err ){
      return res.status(400).json({
        ok:false ,
        err
      });
    };

    if(!categoria){
      return res.status(400).json({
        ok:false ,
        err:{
          message:'User no Found, it is dead ;)'
        }
      });
    }

    console.log('kill categoria');
    res.json({
      ok:true,
      categoria:categoria
    });

  });
});

module.exports= app;
