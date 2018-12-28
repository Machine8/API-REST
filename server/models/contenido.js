const mongoose = require('mongoose');

// validate campos
const uniqueValidator = require('mongoose-unique-validator')

//importar metodo Schema
let Schema = mongoose.Schema;

let contenidoSchema = new Schema({
  author:{
    type:Schema.Types.ObjectId, ref: 'Usuario'
  },
  nombreUser:{
    type:String,
  },
  titulo:{
    type:String,
    required:[true, 'the name is neccesary']
  },

  descripcion:{
    type:String,
    required:[true, 'the name is neccesary']
  },

  creado:{
    type:Date,
    default:Date.now
  },

});

contenidoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Contenido', contenidoSchema);
