const express = require('express')

const app = express();
const path = require('path');
const fs = require('fs');

app.get('/imagen/:tipo/:img', (req, res)=>{
        let tipo =  req.params.tipo;
        let img =  req.params.img;

        let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

        if(fs.existsSync(pathImage)){
          res.sendFile(pathImage);
        }else{
            let noimagenPath = path.resolve(__dirname, '../assets/no-image.jpg');
            res.sendFile(noimagenPath);
        }




});

module.exports=app;
