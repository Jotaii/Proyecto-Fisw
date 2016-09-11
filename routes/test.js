/**
 * Created by AlfredoUser on 11-09-2016.
 */
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


/*GET test page.*/
router.get('/test', function(req, res, next) {
    console.log("test");
    res.sendFile(path.join(__dirname, '../', 'views', 'test.html'));
});

/* POST test page. */
router.post('/test', function(req, res, next) {

    var EC1 = req.body.a1+req.body.a2+req.body.a3+req.body.a4+req.body.a5+req.body.a6+req.body.a7+req.body.a8;
    var EC =EC1+req.body.a9+req.body.a10+req.body.a11+req.body.a12 ;
    var OR1 = req.body.b1+req.body.b2+req.body.b3+req.body.b4+req.body.b5+req.body.b6+req.body.b7+req.body.b8;
    var OR =OR1+req.body.b9+req.body.b10+req.body.b11+req.body.b12 ;
    var CA1 =req.body.c1+req.body.c2+req.body.c3+req.body.c4+req.body.c5+req.body.c6+req.body.c7+req.body.c8;
    var CA =CA1+req.body.c9+req.body.c10+req.body.c11+req.body.c12 ;
    var EA1 = req.body.d1+req.body.d2+req.body.d3+req.body.d4+req.body.d5+req.body.d6+req.body.d7+req.body.d8;
    var EA =EA1+req.body.d9+req.body.d10+req.body.d11+req.body.d12 ;

    var CAEC = CA-EC;
    var EAOR = EA-OR;


    if(CAEC < 4 && EAOR > 5){
        console.log("Alumno es Adaptador!");
        res.redirect("/home");
        //res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
    }
    else if(CAEC < 4 && EAOR < 6){
        console.log("Alumno es Divergente!");
        res.redirect("/home");
    }
    else if(CAEC > 3 && EAOR < 6){
        console.log("Alumno es Asimilador!");
        res.redirect("/home");
    }
    else{
        console.log("Alumno es Convergente!");
        res.redirect("/home");
    }

});


module.exports = router;