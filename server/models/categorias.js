const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator')

let categoriaSchema = new Schema({
   descripcion: {
     type:String,

     required:[
       true,
       'The information necesarry'
     ]
   },

   usuario:{type: Schema.Types.ObjectId, ref: 'Usuario'}
});

categoriaSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);