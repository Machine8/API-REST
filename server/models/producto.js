const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator')

const productoSchema = new Schema({
  nombre:{
    type:String,
  
    required:[
      true,
      'The information necesarry'
    ]
  },

  descripcion:{
    type:String,
    required:[
      true,
      'The information necesarry'
    ]
  },

  precio:{
     type:Number,

     required:[
       true,
       'The information necesarry'
     ]

  },

  estado:{
    type:Boolean,

  },

  usuario:{type: Schema.Types.ObjectId, ref: 'Usuario'},
  categoria:{type: Schema.Types.ObjectId, ref: 'Categoria'}
});

productoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Producto', productoSchema);
