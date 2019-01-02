//        ------------------Entorno de desarrollo y entorno de desarrollo


//========================
//Port config global
//==================================

process.env.PORT = process.env.PORT || 4000;

//========================
//Entorno
//==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================
//caducidad
//==================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//========================
//caducidad
//==================================
process.env.SEED = process.env.SEED || 'este-es-el-sed-dessarollo' ;

//========================
//Bases de datos conection
//==================================

let urlDB;
// determinar si estamos en desarrollo o en produccion
if(process.env.NODE_ENV === 'dev'){
  urlDB ='mongodb://localhost:27017/cafe';
}else{
  urlDB =process.env.MONGO_URL;
}

process.env.URLDB = urlDB;
