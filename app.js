var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var images = require('./index');
var mailer = require('express-mailer');

// Definicion de controladores---------------------------------------------
var grade_controller = require('./controllers/index');
var users_controller = require('./controllers/users');

// Configuracion de aplicacion --------------------------------------------
var app = express();

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Dependencias a usar ----------------------------------------------------
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use("/images", images);
//app.use(multer({dest:'./uploads/'}));

// Sesion de usuarios -----------------------------------------------------

app.use(session({
  cookieName: 'session',
  secret: 'guachimingo',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: true,
  saveUninitialized: true
}));

// Redirigir rutas a controladores ----------------------------------------
app.use(['/','/home','/auth'], grade_controller);
app.use('/users', users_controller);

// Manejo de errores ---------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  console.log(err.status);
});

mailer.extend(app, {
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: "sistema.kolb@gmail.com",
    pass: "UneedKolb"
  }
});

app.get('/registro_alumno', function (req, res, next){
  app.mailer.send('emai', {
    from:'sistema.kolb@gmail.com',
    to: 'pruebafisw@gmail.com',
    subject: 'Credenciales',
    template:'credenciales',
    contexto:{
      userN: 'Jon.Snow.16',
      userP: '12345'
    },
    otherProperty: "otra propiedad"
  }, function(err){
    if (err){
      console.log(err);
      res.send("Hubo un error enviando el mail");
      return;
    }
    res.send("Email enviado");
  });
});





module.exports = app;


