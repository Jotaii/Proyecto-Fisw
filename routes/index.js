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



module.exports = router;