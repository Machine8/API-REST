const mongoose = require('mongoose');
const Contenido = require('../models/contenido')

// validar campos
const uniqueValidator = require('mongoose-unique-validator')


let rolesValidos = {
  values: ['ADMIN', 'USER'],
  message: '{values} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

   nombre:{
     // parametros , condiciones que se add a los campos o propiedades
     type:String,
     required:[true, 'the name is neccesary']
   },

  email:{
     // parametros , condiciones que se add a los campos o propiedades
     type:String,
     unique:true,
     required:[true, 'the name is neccesary']
   },

   password:{
     // parametros , condiciones que se add a los campos o propiedades
     type:String,
     required:[true, 'the name is neccesary']
   },

   nickname:{
     type:String,
      unique:true
   },
   img:{
     type: String,
     required: false,
   },
   role:{
     type: String,
     default:'USER_ROLE',
     enum:rolesValidos
   },
   estado:{ // el estado nos ayuda a conocer la activdad del User dentro de la App
     type: Boolean,
     default: true
   },
   google:{
     type: Boolean,
     default: false
   },

    contenido: [{ type: Schema.Types.ObjectId, ref: 'Contenido' }]

});

//escoder the password
usuarioSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}


usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);
