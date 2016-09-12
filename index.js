<<<<<<< HEAD
/**
 * Created by francisco on 22-08-16.
 */

var mysql = require("mysql");
var connection = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "palpadv2",
        database : "nodejs",

    }
);





console.log("Apretaste el boton")





/*


connection.connect();

connection.query("SELECT * FROM tabla1", function (err, rows) {
    if (err) throw err;
    console.log("The number is: ", rows[0].id);
    console.log("The name is: ", rows[0].nombre);
    console.log("The number is: ", rows[1].id);
    console.log("The name is: ", rows[1].nombre);
});

//connection.query("INSERT INTO tabla1 (id,nombre) VALUES (2,'Vegeta')");

connection.end();*/
=======
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


// Funcion para registrar usuario
function Register(user,appat, apmat, rut, mail, fechanac, contrasenia, callback) {

    var db = require("../BD_connection");
    var username = user + '.' + appat + '.' + rut.split('.')[1];

    while (repeat = true) {
        db.query('select * from Usuario where nombre_usuario =' + username,
            function (err, rows, fields) {
                if (err) {
                    console.log("ERROR EN LA BASE DE DATOS");
                } else {
                    if (rows.length() == 0) {
                        repeat = false;
                        db.query('insert into Usuario (' +
                            'nombre_usuario,' +
                            ' password_usuario,' +
                            ' tipo_usuario) values ('
                            + username + ',' + password + ',0)',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("ERROR EN LA BASE DE DATOS");
                                } else {
                                    console.log("Registro exitoso");
                                }
                            });
                        db.query('insert into Alumno (' +
                            'nombre_alumno,' +
                            'apellido_p_alumno, ' +
                            'apellido_m_alumno,' +
                            'rut_alumno,' +
                            'nac_alumno' +
                            'categoria' +
                            'nombre_usuario) values ('
                            + user + ',' + appat + ',' + apmat + ',' + rut + ',' + fechanac + ', 0' + username + ')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("ERROR EN LA BASE DE DATOS");
                                } else {
                                    console.log("Ok");
                                    return callback(1);
                                }
                                return callback(0);
                            });

                    } else {
                        rutint = rut.split('.')[1];
                        username = user + '.' + appat + '.' + toString((parseInt(rutint) + 1));
                    }

                }
            });
    }
}


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
    router.post('/register', function (req, res, next) {

        var nombre = req.body.Nombre;
        var appat = req.body.Appat;
        var appmat = req.body.Apmat;
        var rut = req.body.rut;
        var mail = req.body.correo;
        var fnac = req.body.fechnac;
        var pss = req.body.password;

        var success = 0;

        Register(nombre, appat, appmat, rut, mail, fnac, pss, function (success) {

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
    });

module.exports = router;
>>>>>>> new_project
