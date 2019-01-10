const express = require('express')
const fileUpload = require('express-fileupload')
const app = express();
const path = require('path');
const fs = require('fs');

//export models
const Usuario = require('../models/usuario')
const Producto = require('../models/producto')


app.use(fileUpload());

app.put('/upload/:tipo/:id', (req,res) =>{

    let tipo = req.params.tipo;
    let id = req.params.id;

       if(!req.files){
         return res.status(400)
              .json({
                 ok:false,
                 err:{
                   message:'no se ha selecionado ningun archivo'
                 }
              });
       }

     let tiposValidos = ['usuarios', 'productos']


     if(tiposValidos.indexOf( tipo ) < 0){
       return res.status(400)
            .json({
               ok:false,
               err:{
                 message:'los tipos validas son '+ tiposValidos.join(',')
               }
            });
     }


       let archivo = req.files.archivo;
       let nombreCortado = archivo.name.split('.');
       let extension = nombreCortado[nombreCortado.length - 1];

       // Extenciones Permitidas
       let extensionValidas = ['png', 'jpg', 'gif', 'jpeg'];

       if(extensionValidas.indexOf( extension ) < 0){
         return res.status(400)
              .json({
                 ok:false,
                 err:{
                   message:'las Extenciones validas son '+ extensionValidas.join(',')
                 }
              });
       }


// cambiar nombre archivo

let nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extension}`

       archivo.mv(`uploads/${tipo}/${nombreArchivo}` , (err)=>{

         if(err){
           return res.json({
                   ok:false,
                   err
                });
         }
// image cargada
        /* res.json({
           ok:true,
           message:'archivo succes'
         });*/
         if(tipo == 'usuarios'){
           imageUsuario(id,res,nombreArchivo)
         }else{
           imageProducto(id,res,nombreArchivo)
         }




       });
});


let imageUsuario= (id,res,nombreArchivo) =>{

    Usuario.findById(id,(err, usuarioDB) =>{

   if(err){

     borrarIamge(nombreArchivo,'usuarios');
      return res.status(500)
           .json({
              ok:false,
              err
           });
    }
    if(!usuarioDB){

      borrarIamge(nombreArchivo,'usuarios');
      return res.status(500)
           .json({
              ok:false,
              err:{
                message:'usuario no existe'
              }
           });


    }


        borrarIamge(usuarioDB.img,'usuarios');


    usuarioDB.img= nombreArchivo;
    usuarioDB.save((err,userSave)=>{
      res.json({
        ok:true,
        usuario:userSave,
        img:nombreArchivo
      });
    });



    });




}

//subir img producto

let imageProducto = (id, res,nombreArchivo) =>{

      Producto.findById(id, (err, productoDB) =>{

             if(err){
               return res.status(500)
                    .json({
                       ok:false,
                       err
                    });
             }

             if(!productoDB){


               return res.status(500)
                    .json({
                       ok:false,
                       err:{
                         message:'producto no existe'
                       }
                    });


             }

             borrarIamge(productoDB.img,'productos');


         productoDB.img= nombreArchivo;
         productoDB.save((err,productSave)=>{
           res.json({
             ok:true,
             producto:productSave,
             img:nombreArchivo
           });
         });

      });
}


//borrar imagen repitida

let borrarIamge = (nombreArchivo, tipo) =>{

         let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);

         if(fs.existsSync(pathImage)){
           fs.unlinkSync(pathImage);
         }

}


module.exports=app;
