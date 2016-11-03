var express = require('express');
var router = express.Router();
var path = require('path');
var dialog = require('dialog');
var crypto = require('crypto'); // Modulo para encriptar cosas
var session;

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

function interigual(a,b,c,d){
  if (a == b || a == c ||
      a == d || b == c ||
      b == d || c == d){
    return true;
  }
  return false;
}

//---------------------------------------------------------------------
// RUTAS --------------------------------------------------------------
//---------------------------------------------------------------------

/* GET login page. */
router.get('/', function(req, res, next) {
  //CallVegeta();

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
      //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
    }
    else{
      console.log("Error autentificación");
      res.render("login_error");
    }
  });
});



/* GET home page. */
router.get('/home', requireLogin, function(req, res, next) {
  console.log("home");

  res.render("home", {user_session: req.session.user});

  //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});


/* GET auth page. */
router.get('/auth', function(req, res, next) {
  console.log("auth");

  var caca = "conchetumare";

  res.render('auth', { excremento: caca });

  //res.sendFile(path.join(__dirname, '../', 'views', 'auth.html'));
});



/* GET home page. */
router.get('/home_adaptador', function(req, res, next) {
  console.log("home_adaptador");
  res.render('home_adaptador');
});



/* GET home page. */
router.get('/home_divergente', function(req, res, next) {
  console.log("home_divergente");
  res.render('home_divergente');
});


/* GET home page. */
router.get('/home_asimilador', function(req, res, next) {
  console.log("home_asimilador");
  res.render('home_asimilador');
});


/* GET home page. */
router.get('/home_convergente', function(req, res, next) {
  console.log("home_convergente");
  res.render('home_convergente');
});


/*GET test page.*/
router.get('/test', function(req, res, next) {
  console.log("test");
  res.render("test", {user_session : req.session.user});
});

/* POST test page. */
router.post('/test', function(req, res, next) {

  if (interigual(req.body.a1,req.body.b1,req.body.c1,req.body.d1)||
      interigual(req.body.a2,req.body.b2,req.body.c2,req.body.d2)||
      interigual(req.body.a3,req.body.b3,req.body.c3,req.body.d3)||
      interigual(req.body.a4,req.body.b4,req.body.c4,req.body.d4)||
      interigual(req.body.a5,req.body.b5,req.body.c5,req.body.d5)||
      interigual(req.body.a6,req.body.b6,req.body.c6,req.body.d6)||
      interigual(req.body.a7,req.body.b7,req.body.c7,req.body.d7)||
      interigual(req.body.a8,req.body.b8,req.body.c8,req.body.d8)||
      interigual(req.body.a9,req.body.b9,req.body.c9,req.body.d9)||
      interigual(req.body.a10,req.body.b10,req.body.c10,req.body.d10)||
      interigual(req.body.a11,req.body.b11,req.body.c11,req.body.d11)||
      interigual(req.body.a12,req.body.b12,req.body.c12,req.body.d12)) {
    console.log("Error en el Test, Respuestas iguales");
    res.render("test_error");
  }

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

  var usuario = user_session
  var db = require("../BD_connection","mysql-activerecord");
  db.where({ nombre_usuario:usuario});
  db.get('Alumno', function(err, results, fields){
    var largoquery = results.length;
    console.log("entramos al if del registro");
  });





  if(CAEC < 4 && EAOR > 5){
    console.log("Alumno es Adaptador!");
    var newData = {
      rut_alumno : results.rut,
      nombre_alumno :results.nombre,
      apellido_p_alumno : results.appat,
      apellido_m_alumno : results.apmat,
      nac_alumno : results.fnac,
      categoria_alumno : 1,
      nombre_usuario : usuario
    };

    db.where({ nombre_usuario:usuario});
    db.update('people', newData, function(err) {
      if (!err) {
        console.log('Updated!');
      }
    });
    res.redirect("/home_adaptador");
    //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
  }
  else if(CAEC < 4 && EAOR < 6){
    console.log("Alumno es Divergente!");
    var newData = {
      rut_alumno : results.rut,
      nombre_alumno :results.nombre,
      apellido_p_alumno : results.appat,
      apellido_m_alumno : results.apmat,
      nac_alumno : results.fnac,
      categoria_alumno : 2,
      nombre_usuario : usuario
    };

    db.where({ nombre_usuario:usuario});
    db.update('people', newData, function(err) {
      if (!err) {
        console.log('Updated!');
      }
    });
    res.redirect("/home_divergente");
  }
  else if(CAEC > 3 && EAOR < 6){
    console.log("Alumno es Asimilador!");
    var newData = {
      rut_alumno : results.rut,
      nombre_alumno :results.nombre,
      apellido_p_alumno : results.appat,
      apellido_m_alumno : results.apmat,
      nac_alumno : results.fnac,
      categoria_alumno : 3,
      nombre_usuario : usuario
    };

    db.where({ nombre_usuario:usuario});
    db.update('people', newData, function(err) {
      if (!err) {
        console.log('Updated!');
      }
    });
    res.redirect("/home_asimilador");
  }
  else{
    console.log("Alumno es Convergente!");
    var newData = {
      rut_alumno : results.rut,
      nombre_alumno :results.nombre,
      apellido_p_alumno : results.appat,
      apellido_m_alumno : results.apmat,
      nac_alumno : results.fnac,
      categoria_alumno : 4,
      nombre_usuario : usuario
    };

    db.where({ nombre_usuario:usuario});
    db.update('people', newData, function(err) {
      if (!err) {
        console.log('Updated!');
      }
    });
    res.redirect("/home_convergente");
  }

});

/* GET register page. */
router.get('/registro', function (req, res, next) {
  console.log("home");
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
      res.redirect("/home");
      //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
    }
    else {
      console.log("Error en el registro");
      res.render("register_error");
      //res.sendFile(path.join(__dirname, '../', 'views', 'register_error.html'));
    }
  });
});


/* GET register page. */
router.get('/campo_electrico', function (req, res, next) {
  res.render("campo_electrico");
});


module.exports = router;