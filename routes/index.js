var express = require('express');
var router = express.Router();
var path = require('path');
var dialog = require('dialog');
var crypto = require('crypto'); // Modulo para encriptar cosas


// Funcion para autenticar usuario. by #Goku
function Authenticate(user,pass,callback) {

  var db = require("../BD_connection");

  db.query('select * from Usuario', function(err, rows, fields){
    if (err) {
      console.log("ERROR EN LA BASE DE DATOS");
    }
    else {
      for (var i in rows) {

        var user_i = rows[i].nombre_usuario;
        var pass_i = rows[i].password_usuario;

        if (user_i == user && pass_i == pass){
          return callback(1);
        }
      }
      return callback(0);
    }
  });
}

//---------------------------------------------------------------------
// RUTAS --------------------------------------------------------------
//---------------------------------------------------------------------

/* GET login page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* POST login page. */
router.post('/', function(req, res, next) {

  var user = req.body.username;
  var pass = req.body.password;

  var success = 0;

  Authenticate(user,pass, function (success) {

    if(success == 1){
      console.log("Usuario logeado correctamente!")
      res.redirect("/home");
      //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
    }
    else{
      console.log("Error autentificación");
      res.sendFile(path.join(__dirname, '../', 'views', 'login_error.html'));
    }
  });
});



/* GET home page. */
router.get('/home', function(req, res, next) {
  console.log("home");
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});



/* GET home page. */
router.get('/home_adaptador', function(req, res, next) {
  console.log("home_adaptador");
  res.sendFile(path.join(__dirname, '../', 'views', 'home_adaptador.html'));
});



/* GET home page. */
router.get('/home_divergente', function(req, res, next) {
  console.log("home_divergente");
  res.sendFile(path.join(__dirname, '../', 'views', 'home_divergente.html'));
});


/* GET home page. */
router.get('/home_asimilador', function(req, res, next) {
  console.log("home_asimilador");
  res.sendFile(path.join(__dirname, '../', 'views', 'home_asimilador.html'));
});


/* GET home page. */
router.get('/home_convergente', function(req, res, next) {
  console.log("home_convergente");
  res.sendFile(path.join(__dirname, '../', 'views', 'home_convergente.html'));
});





/*GET test page.*/
router.get('/test', function(req, res, next) {
  console.log("test");
  res.sendFile(path.join(__dirname, '../', 'views', 'test.html'));
});

/* POST test page. */
router.post('/test', function(req, res, next) {

  var EC1 = parseInt(req.body.a1)+parseInt(req.body.a2)+parseInt(req.body.a3)+parseInt(req.body.a4)+parseInt(req.body.a5)+parseInt(req.body.a6)+parseInt(req.body.a7)+parseInt(req.body.a8);
  var EC =EC1+parseInt(req.body.a9)+parseInt(req.body.a10)+parseInt(req.body.a11)+parseInt(req.body.a12) ;
  var OR1 = parseInt(req.body.b1)+parseInt(req.body.b2)+parseInt(req.body.b3)+parseInt(req.body.b4)+parseInt(req.body.b5)+parseInt(req.body.b6)+parseInt(req.body.b7)+parseInt(req.body.b8);
  var OR =OR1+parseInt(req.body.b9)+parseInt(req.body.b10)+parseInt(req.body.b11)+parseInt(req.body.b12) ;
  var CA1 =parseInt(req.body.c1)+parseInt(req.body.c2)+parseInt(req.body.c3)+parseInt(req.body.c4)+parseInt(req.body.c5)+parseInt(req.body.c6)+parseInt(req.body.c7)+parseInt(req.body.c8);
  var CA =CA1+parseInt(req.body.c9)+parseInt(req.body.c10)+parseInt(req.body.c11)+parseInt(req.body.c12) ;
  var EA1 = parseInt(req.body.d1)+parseInt(req.body.d2)+parseInt(req.body.d3)+parseInt(req.body.d4)+parseInt(req.body.d5)+parseInt(req.body.d6)+parseInt(req.body.d7)+parseInt(req.body.d8);
  var EA =EA1+parseInt(req.body.d9)+parseInt(req.body.d10)+parseInt(req.body.d11)+parseInt(req.body.d12) ;

  var CAEC = CA-EC;
  var EAOR = EA-OR;

  console.log("caec: "+CAEC);
  console.log("eaor: "+EAOR);


  if(CAEC < 4 && EAOR > 5){
    console.log("Alumno es Adaptador!");
    res.redirect("/home_adaptador");
    //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
  }
  else if(CAEC < 4 && EAOR < 6){
    console.log("Alumno es Divergente!");
    res.redirect("/home_divergente");
  }
  else if(CAEC > 3 && EAOR < 6){
    console.log("Alumno es Asimilador!");
    res.redirect("/home_asimilador");
  }
  else{
    console.log("Alumno es Convergente!");
    res.redirect("/home_convergente");
  }

});






module.exports = router;