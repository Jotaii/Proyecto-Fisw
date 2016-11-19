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
    module.exports = req.session.user;
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
              return callback(0);
          }
          else {
              console.log('Alumno '+ data.nombre + " "+ data.appat + " "+ data.apmat + " agregado satisfactoriamente");
              return callback(1);
          }

      });

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

router.get("agregar_contenido", function(req,res){
  res.send("Images Route");
});

router.get('/upload', function (req, res) {
  res.sendfile("../views/agregar_contenido.html");
});

router.post('/upload', function (req, res) {
  var multiparty = require('multiparty');
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files){
    var img = files.images[0];
    var fs = require('fs');

    fs.readFile(img.path, function(err, data){
      var path = "./public/uploads/" +img.originalFilename;
      /*var db = require("../BD_connection","mysql-activerecord");
      db.where({nombre_usuario: req.session.user.nombre_usuario});
      db.get('Usuario', function (err, results, fields) {
        var NewData = {

        }
      }*/
      fs.writeFile(path, data, function(error){
        if(error) console.log(error);

        res.send("UploadSuccess")
      });
    });

  });

});



/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect("/home");
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
      var db2 = require("../BD_connection","mysql-activerecord");
      db.where({nombre_usuario: user});
      db.get('Usuario', function (err, results, fields) {

        obj_usuario = results[0];

        sess.user = obj_usuario;
        console.log("session iniciada como: "+sess.user.nombre_usuario);

        if(results[0].tipo_usuario == 0){
          db2.where({categoria_alumno:0, nombre_usuario: sess.user.nombre_usuario});
          db2.get('Alumno',function(err,resultado,fields){
            var largo = resultado.length;
            if(largo==1){
              res.redirect('/test');
            }else{
              res.redirect("/home");
            }
          });
        } else {
          res.redirect("/home");
        }


      });
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
router.get('/test', requireLogin, function(req, res, next) {
  console.log("test");
  res.render('test', {user_session: req.session.user});
});

/* POST test page. */
router.post('/test', requireLogin, function(req, res, next) {

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
  var db = require("../BD_connection","mysql-activerecord");
  var db2 = require("../BD_connection","mysql-activerecord");
  console.log(req.session.user);
  db.where({nombre_usuario: req.session.user.nombre_usuario});



  if(CAEC < 4 && EAOR > 5){
    db.get('Alumno', function(err, results, fields) {
      console.log(results);
      var NewData = results;
      NewData.categoria_alumno =  1;
      db2.where({nombre_usuario: req.session.user.nombre_usuario});
      db2.update('Alumno', results, function(err) {
        if (!err){
          console.log("Alumno"+ req.session.user.nombre_usuario +"es Adaptador!");
          //res.redirect("/home_adaptador");
        }
      });
    });
    //res.sendFile(path.join(__dirname, '../', 'views', 'prueba.html'));
  }
  else if(CAEC < 4 && EAOR < 6){

    db.get('Alumno', function(err, results, fields) {
      console.log(results);
      var NewData = results;
      NewData.categoria_alumno = 2;
      db2.where({nombre_usuario: req.session.user.nombre_usuario});
      db2.update('Alumno', results, function(err) {
        if (!err){
          console.log("Alumno"+ req.session.user.nombre_usuario +"es Divergente!");
          //res.redirect("/home_divergente");
        }
      });
    });
  }
  else if(CAEC > 3 && EAOR < 6){
    db.get('Alumno', function(err, results, fields) {
      console.log(results);
      var NewData = results;
      NewData.categoria_alumno = 3;
      db2.where({nombre_usuario: req.session.user.nombre_usuario});
      db2.update('Alumno', results, function(err) {
        if (!err){
          console.log("Alumno"+ req.session.user.nombre_usuario +"es Asimilador!");
          //res.redirect("/home_asimilador");
        }
      });
    });
  }
  else{
    db.get('Alumno', function(err, results, fields) {
      console.log(results);
      var NewData = results;
      NewData.categoria_alumno = 4;
      db2.where({nombre_usuario: req.session.user.nombre_usuario});
      db2.update('Alumno', NewData, function(err) {
        if (!err){
          console.log("Alumno"+ req.session.user.nombre_usuario +"es Convergente!");
          //res.redirect("/home_convergente");
        }
      });
    });
  };

  res.redirect("/home");

});

/* GET register page. */
router.get('/registro', function (req, res, next) {
  res.render("registro");
});


/* GET register page. */
router.get('/registro_profe', function (req, res, next) {
  res.render("registro_profe");
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
      res.redirect("/");
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
    var nombre_usuario = req.session.user.nombre_usuario;

    db.where({ nombre_usuario : nombre_usuario });
    db.get('Alumno', function(err, results_Alumno, fields) {

      var alumno = results_Alumno[0];

      db.where({ Alumnoid_alumno : alumno.id_alumno });
      db.get('Ramo_Alumno', function(err, results_Ramo_Alumno, fields) {

        Ramo_Alumno = results_Ramo_Alumno;

        if(Ramo_Alumno.length != 0){

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
                console.log(req.session.nombres_ramos);
                res.render("home", {user_session : req.session.user, nombres_ramos : req.session.nombres_ramos,
                  id_ramos : req.session.id_ramos});
              }

            });
          }
        }
        else{
          res.render("home", {user_session : req.session.user, nombres_ramos : [],
            id_ramos : req.session.id_ramos});
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

    db.where({id_contenido: contenido.id_contenido});
    db.get('Sub_Contenido', function (err, results_subcontenido, fields) {

      sub_contenidos = results_subcontenido;

      // Para almacenar los subcontenidos si es que existen
      var motivacion = [];
      var def_conceptos = [];
      var exp_a_realizar = [];
      var video_motivacional = [];
      var que_problema_resuelve = [];
      var datos_necesarios_para_ejercicio = [];
      var formulario = [];
      var ejemplos = [];
      var preguntas_del_tipo = [];
      var lluvia_ideas = [];
      var analogias = [];
      var ejercicio_mapa_conceptual = [];
      var base_teorica = [];
      var conocimientos_previos = [];
      var principio_teoria = [];
      var documentacion_adicional = [];
      var que_aprenderas_topico = [];
      var experimentacion_explicacion = [];
      var formulario_ejercicios = [];

      for(var i=0;i<sub_contenidos.length;i++){
        sub_contenido = sub_contenidos[i];

        if(sub_contenido.tipo_subcontenido == "Motivacion"){
          motivacion.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Definicion de conceptos clave"){
          def_conceptos.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Experimentos a realizar"){
          exp_a_realizar.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Video motivacional"){
          video_motivacional.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Que problema resuelve el topico"){
          que_problema_resuelve.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Datos necesarios para los ejercicios del tema"){
          datos_necesarios_para_ejercicio.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Formulario"){
          formulario.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Ejemplos"){
          ejemplos.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Preguntas del tipo 'Que pasa si...?'"){
          preguntas_del_tipo.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Lluvia de ideas"){
          lluvia_ideas.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Analogias"){
          analogias.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Ejercicio del mapa conceptual"){
          ejercicio_mapa_conceptual.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Base teorica"){
          base_teorica.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Conocimientos previos"){
          conocimientos_previos.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Principio y teoria"){
          principio_teoria.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Documentacion adicional"){
          documentacion_adicional.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Que aprenderas con el topico"){
          que_aprenderas_topico.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Experimentacion con explicacion"){
          experimentacion_explicacion.push(sub_contenido);
        }
        else if(sub_contenido.tipo_subcontenido == "Formulario con ejercicios"){
          formulario_ejercicios.push(sub_contenido);
        }
      }

      res.render('contenidos_ramo', {user_session: req.session.user, id_ramo : id_ramo, contenido : contenido
        ,motivacion : motivacion, def_conceptos : def_conceptos, exp_a_realizar : exp_a_realizar,
        video_motivacional : video_motivacional, que_problema_resuelve : que_problema_resuelve,
        datos_necesarios_para_ejercicio : datos_necesarios_para_ejercicio, formulario : formulario,
        ejemplos : ejemplos, preguntas_del_tipo : preguntas_del_tipo, lluvia_ideas : lluvia_ideas,
        analogias : analogias, ejercicio_mapa_conceptual : ejercicio_mapa_conceptual,
        base_teorica : base_teorica, conocimientos_previos : conocimientos_previos,
        principio_teoria : principio_teoria, documentacion_adicional : documentacion_adicional,
        que_aprenderas_topico : que_aprenderas_topico, experimentacion_explicacion : experimentacion_explicacion,
        formulario_ejercicios : formulario_ejercicios});
    });

  });
});


router.get('/ramo/:id_ramo/agregar_contenido', function (req, res, next) {

  var id_ramo = req.params.id_ramo;

  // Aca se pueden hacer consultas para recuperar el objeto ramo y contenido entero

  res.render('agregar_contenido', {user_session: req.session.user, id_ramo : id_ramo});
});

module.exports = router;