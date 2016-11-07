var express = require('express');
var router = express.Router();
var path = require('path');
var dialog = require('dialog');
var crypto = require('crypto'); // Modulo para encriptar cosas


// Funcion para autenticar usuario. by #Goku
function Authenticate(user,pass,callback) {

  var db = require("../BD_connection");

  db.query('select * from Usuario',
      function(err, rows, fields){
        if (err) {
          console.log("ERROR EN LA BASE DE DATOS");
        }
        else {      for (var i in rows) {

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


//Funcion para registrarUsuario con activerecord

function registrarUsuario(data, callback) {
    var db = require("../BD_connection");
    var user = data.nombre+ '.' + data.appat + '.' + data.rut.split(".")[1];
    //primero verificar si ya existe el usuario
    db.where({ nombre_usuario : user});
    db.get('Usuario', function(err, results, fields){
        if(results.length == 0){
            var insercion_usuario = {
                nombre_usuario : user,
                password_usuario : data.pss,
                tipo_usuario : 0,
                mail_usuario : data.mail
            };
            db.insert('Usuario', insercion_usuario, function(err, info) {
                console.log('New row ID is ' + insercion_usuario.nombre_usuario);
            });

            var insercion_alumno = {
                rut_alumno : data.rut,
                nombre_alumno : data.nombre,
                apellido_p_alumno : data.appat,
                apellido_m_alumno : data.apmat,
                nac_alumno : data.fnac,
                categoria_alumno : 0,
                nombre_usuario : user
            };
            db.insert('Alumno', insercion_alumno, function(err, info) {
                console.log('Alumno '+ data.nombre + " "+ data.appat + " "+ data.apmat + " agregado satisfactoriamente");
            });
            sendMail(user,data.mail);

        }
        else{
            return err;
        }
    });
};


//---------------------------------------------------------------------
// RUTAS --------------------------------------------------------------
//---------------------------------------------------------------------

    /* GET login page. */
    router.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    });

    /* POST login page. */
    router.post('/', function (req, res, next) {

        var user = req.body.username;
        var pass = req.body.password;

        var success = 0;

        Authenticate(user, pass, function (success) {

            if (success == 1) {
                console.log("Usuario logeado correctamente!");
                res.redirect("/home");
                //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
            }
            else {
                console.log("Error autentificación");
                res.sendFile(path.join(__dirname, '../', 'views', 'login_error.html'));
            }
        });
    });


    /* GET home page. */
    router.get('/home', function (req, res, next) {
        console.log("home");
        res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
    });

    /* GET register page. */
    router.get('/registro', function (req, res, next) {
        console.log("home");
        res.sendFile(path.join(__dirname, '../', 'views', 'registro.html'));
    });


/* POST register page. */
router.post('/registro', function (req, res, next) {

    var data = {
        nombre : req.body.Nombre,
        appat : req.body.Appat,
        apmat : req.body.Apmat,
        rut : req.body.rut,
        mail : req.body.correo,
        fnac : req.body.fechnac,
        pss : req.body.password

    };

    var success = 0;

    registrarUsuario(data, function (success) {

        if (success == 1) {
            console.log("Usuario Registrado");
            res.redirect("/home");
            //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
        }
        else {
            console.log("Error en el registro");
            res.sendFile(path.join(__dirname, '../', 'views', 'register_error.html'));
        }
    });
    res.redirect("/test");
});

router.post('/upload', function(req,res){
    console.log(req.body);
    console.log(req.files);
    res.json({success: true});
});


module.exports = router;