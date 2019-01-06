const mongoose = require('mongoose');
const express = require('express')
const app = express()
const expressHbs = require('express-handlebars');


app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const Producto = require('../models/producto')

const { verificaToken }= require('../middlewares/autentificacion')

app.get('/producto', (req, res)=>{

  let start = req.query.start || 0;
  start = Number(start);

     Producto.find({/*atributo del modelo campo:campo*/})
     //.skip(start)
     //.limit(5)
     .populate('usuario', 'nickname email')
     .populate('categoria', 'descripcion')
     .exec((err, productos)=>{

       if(err){
         return res.status(500).json({
           ok:false,
           err
         });
       }

       res.json({
         ok:true,
         producto:productos
       });

     });
});


//buscar

app.get('/producto/buscar', (req, res ) =>{


        let busca = req.body.busca;

        // hacer sencible la busqueda
         let regex = new RegExp(busca, 'i');

         //busqueda de los productos

         Producto.find({ nombre: regex })
         .populate('categoria', 'descripcion')
         .exec((err, producto)=>{
           if(err){
             return res.status(500).json({
               ok:false,
               err
             });
           }
          /* res.json({

             prodcutos:producto
           });*/
           res.render('home',{

               producto

             });

         });



});
app.get('/producto/busqueda', (req, res ) =>{


        let busca = req.query.busca;
        let alert = null;
        // hacer sencible la busqueda
         let regex = new RegExp(busca, 'i');

         //busqueda de los productos

         Producto.find({ nombre: regex })
         .populate('categoria', 'descripcion')
         .exec((err, producto)=>{
           if(err){
             return res.status(500).json({
               ok:false,
               err
             });
           }

           if(producto.length == 0){
              alert = `el ternimo ${busca} no esta en la base de datos`;
             res.render('home',{

                 producto,
                 alert:alert

               });
           }else{
             res.render('home',{

                 producto

               });
           }
          /* res.json({

             prodcutos:producto
           });*/


         });



});

app.post('/producto/termino', (req, res ) =>{


        let busca = req.body.busca;

        // hacer sencible la busqueda
         let regex = new RegExp(busca, 'i');

         //busqueda de los productos





});

app.post('/producto', verificaToken, (req, res)=>{
    let body = req.body;

    let producto = new Producto({
      nombre:body.nombre,
      descripcion:body.descripcion,
      precio:body.precio,
      estado:body.estado,
      usuario:req.usuario._id,
      categoria:body.categoria
    });

   producto.save((err,productoDB)=>{
        if(err){
          return res.status(500).json({
            ok:false,
            err
          });
        }

        res.status(201).json({
          ok:true,
          producto:productoDB
        });
   });

});


//segunda forma de editar
app.put('/producto/:id'  ,(req, res)=>{
  let body = req.body;
  let id = req.params.id;

  Producto.findById(id, (err, categoriaDB) =>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!categoriaDB){
      return res.status(500).json({
        ok:false,
        err:{
          message:'no existe category'
        }
      });
    }

    categoriaDB.nombre=body.nombre,
    categoriaDB.descripcion=body.descripcion,
    categoriaDB.precio=body.precio,
    categoriaDB.estado=body.estado,
    categoriaDB.categoria=body.categoria

    categoriaDB.save((err,savingDB) =>{

      if(err){
        return res.status(500).json({
          ok:false,
          err
        });
      }

     res.json({
       ok:true,
       categoria:savingDB
     });

    });
  });
});

app.delete('/producto/:id', verificaToken ,(req, res)=>{
  let body = req.body;
  let id = req.params.id;

  Producto.findById(id, (err, productoDB) =>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!productoDB){
      return res.status(500).json({
        ok:false,
        err:{
          message:'no existe category'
        }
      });
    }


    productoDB.estado=false,


    productoDB.save((err,savingDB) =>{

      if(err){
        return res.status(500).json({
          ok:false,
          err
        });
      }

     res.json({
       ok:true,
       categoria:savingDB,
       mensaje:'Kill Prodcuto'
     });

    });
  });
});



module.exports=app;
