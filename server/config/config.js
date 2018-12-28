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
//Bases de datos conection
//==================================

let urlDB;
// determinar si estamos en desarrollo o en produccion
if(process.env.NODE_ENV === 'dev'){
  urlDB ='mongodb://localhost:27017/cafe';
}else{
  urlDB ='mongodb://cafe-db:cafedb12345@ds143143.mlab.com:43143/cafe-db';
}

process.env.URLDB = urlDB;
