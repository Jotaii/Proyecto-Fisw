var express = require('express');
var router = express.Router();
var path = require('path');
var dialog = require('dialog');
var crypto = require('crypto'); // Modulo para encriptar cosas
var session;
var db = require("../BD_connection","mysql-activerecord");

// Funciones varias -------------------------------------------------------------


// Funcion para verificar si se esta logeado
function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};



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


//Funcion para registrarUsuario con activerecord
function registrarUsuario(data, callback) {
  var db = require("../BD_connection","mysql-activerecord");
  var user = data.nombre+ '.' + data.appat + '.' + data.rut.split(".")[1];

  //primero verificar si ya existe el usuario con mail registrado
  db.where({ mail_usuario: data.mail});
  db.get('Usuario', function(err, results, fields){
    var largoquery = results.length;
    if (largoquery == 0){
      console.log("entramos al if del registro");
        var insercion_usuario = {
        nombre_usuario : user,
        password_usuario : data.pss,
        tipo_usuario : 0,
        mail_usuario : data.mail
      };
      db.insert('Usuario', insercion_usuario, function(err) {
          if (err) {
              console.log("ERROR EN LA BASE DE DATOS");
          }
          else {
              console.log('New row ID is ' + insercion_usuario.nombre_usuario);
          }

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
      db.insert('Alumno', insercion_alumno, function(err) {
          if (err) {
              console.log("ERROR EN LA BASE DE DATOS");
          }
          else {
              console.log('Alumno '+ data.nombre + " "+ data.appat + " "+ data.apmat + " agregado satisfactoriamente");
          }

      });
        return callback(1);
    }
    else{
        console.log("entramos al else del registro");
        return callback(0);
    }
  });
}


//---------------------------------------------------------------------
// RUTAS --------------------------------------------------------------
//---------------------------------------------------------------------

/* GET login page. */
router.get('/', function(req, res, next) {

  if(req.session){
    delete req.session;
  }

  res.render('index');

});

/* POST login page. */
router.post('/', function(req, res, next) {

  var user = req.body.username;
  var pass = req.body.password;

  var success = 0;
  sess = req.session;

  Authenticate(user,pass, function (success) {

    if(success == 1){
      console.log("Usuario logeado correctamente!");
      sess.user = user;
      console.log("session iniciada como: "+sess.user);
      res.redirect("/home");

    }
    else{
      console.log("Error autentificación");
      res.render("login_error");
    }
  });
});


/* GET auth page. */
router.get('/auth', function(req, res, next) {
  console.log("auth");

  var caca = "conchetumare";

  res.render('auth', { excremento : caca });

  //res.sendFile(path.join(__dirname, '../', 'views', 'auth.html'));
});



/* GET home page. */
router.get('/home_adaptador', requireLogin,function(req, res, next) {
  console.log("home_adaptador");
  res.render('home_adaptador',{user_session : req.session.user});
});



/* GET home page. */
router.get('/home_divergente', requireLogin, function(req, res, next) {
  console.log("home_divergente");
  res.render('home_divergente', {user_session : req.session.user});
});


/* GET home page. */
router.get('/home_asimilador', requireLogin,function(req, res, next) {
  console.log("home_asimilador");
  res.render('home_asimilador', {user_session : req.session.user});
});


/* GET home page. */
router.get('/home_convergente', requireLogin, function(req, res, next) {
  console.log("home_convergente");
  res.render('home_convergente', {user_session : req.session.user});
});


/*GET test page.*/
router.get('/test', function(req, res, next) {
  console.log("test");
  res.render('test');
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
    //res.sendFile(path.join(__dirname, '../', 'views', 'prueba.html'));
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

/* GET register page. */
router.get('/registro', function (req, res, next) {
  res.render("registro");
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

  registrarUsuario(data, function (success) {

    if (success == 1) {
      console.log("Usuario Registrado");
      res.redirect("/test");
      //res.sendFile(path.join(__dirname, '../', 'views', 'prueba.html'));
    }
    else {
      console.log("Error en el registro");
      res.render("register_error");
      //res.sendFile(path.join(__dirname, '../', 'views', 'register_error.html'));
    }
  });
});


router.get('/home', requireLogin, function (req, res, next) {

  if(!req.session.ramos){

    nombres_ramos = [];
    id_ramos = [];
    var nombre_usuario = req.session.user;


    db.where({ nombre_usuario : nombre_usuario });
    db.get('Alumno', function(err, results_Alumno, fields) {

      var alumno = results_Alumno[0];

      db.where({ Alumnoid_alumno : alumno.id_alumno });
      db.get('Ramo_Alumno', function(err, results_Ramo_Alumno, fields) {

        Ramo_Alumno = results_Ramo_Alumno;

        for(i=0;i<Ramo_Alumno.length; i++){

          con = 0;

          db.where({ id_ramo : Ramo_Alumno[i].Ramoid_ramo });
          db.get('Ramo', function(err, results_Ramo, fields) {

            ramo = results_Ramo[0];

            console.log(ramo);

            var nombre_ramo = ramo["nombre_ramo"];
            var id_ramo = ramo["id_ramo"];

            nombres_ramos.push(nombre_ramo);
            id_ramos.push(id_ramo);

            req.session.nombres_ramos = nombres_ramos;
            req.session.id_ramos = id_ramos;

            con++;

            if(con == Ramo_Alumno.length){
              res.render("home", {user_session : req.session.user, nombres_ramos : req.session.nombres_ramos,
                id_ramos : req.session.id_ramos});
            }

          });
        }
      });
    });
  }

});


router.get('/ramo/:id_ramo', function (req, res, next) {

  id_ramo = req.params.id_ramo;

  db.where({id_ramo: id_ramo});
  db.get('Contenido', function (err, results_contenido, fields) {

    db.where({id_ramo: id_ramo});
    db.get('Ramo', function (err, results_ramo, fields) {

      ramo = results_ramo[0];

      contenidos = results_contenido;

      res.render("ramo", {user_session: req.session.user, ramo: ramo, contenidos: contenidos});

    });
  });
});


router.get('/ramo/:id_ramo/contenido/:id_contenido', function (req, res, next) {

  var id_ramo = req.params.id_ramo;
  var id_contenido = req.params.id_contenido;

  db.where({id_contenido: id_contenido});
  db.get('Contenido', function (err, results_contenido, fields) {

    contenido = results_contenido[0];

    res.render('contenidos_ramo', {user_session: req.session.user, id_ramo : id_ramo, contenido : contenido});

  });
});


router.get('/ramo/:id_ramo/agregar_contenido', function (req, res, next) {

  var id_ramo = req.params.id_ramo;

  // Aca se pueden hacer consultas para recuperar el objeto ramo y contenido entero

  res.render('agregar_contenido', {user_session: req.session.user, id_ramo : id_ramo});
});


module.exports = router;