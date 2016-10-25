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

//TRABAJAR EN ESTA FUNCION!!! NO ESTA LISTA!!!
//enviar mail con credencial de acceso
function sendMail(contenido, correo){
  var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Sistema Kolb" <sistema.kolb@gmail.com>', // sender address
    to: correo, // list of receivers
    subject: 'Registro Sistema Kolb✔', // Subject line
    text: 'Felicitaciones, tu registro esta completo, tu nombre de usuario es \n username: '+contenido, // plaintext body
    html: '<b>Los tios de Kolb</b>' // html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
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




function CallVegeta(callback) {

  var db = require("../BD_connection");

  // Si quieren cambian vegeta por algun numbre que tengan de Usuario :v
  db.where({ nombre_usuario : 'vegeta' });
  db.get('Usuario', function(err, results, fields) {

  var vegeta = results[0];
    console.log("nombre: "+vegeta.nombre_usuario);
    console.log("pass: "+vegeta.password_usuario);
    console.log("tipo: "+vegeta.tipo_usuario);
  });

}



//---------------------------------------------------------------------
// RUTAS --------------------------------------------------------------
//---------------------------------------------------------------------

/* GET login page. */
router.get('/', function(req, res, next) {

  CallVegeta();

  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* POST login page. */
router.post('/', function(req, res, next) {

  var user = req.body.username;
  var pass = req.body.password;

  var success = 0;

  Authenticate(user,pass, function (success) {

    if(success == 1){
      console.log("Usuario logeado correctamente!");
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
router.get('/auth', function(req, res, next) {
  console.log("auth");
  res.sendFile(path.join(__dirname, '../', 'views', 'auth.html'));
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


/* GET register page. */
router.get('/campo_electrico', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'campo_electrico.html'));
});



module.exports = router;