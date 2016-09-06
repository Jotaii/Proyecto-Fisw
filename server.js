/**
 * Created by francisco on 22-08-16.
 */

// importar
var express = require("express");

// instanciar
var app = express();

// ruteo
app.get("/",function (req,res) {
    res.sendfile(__dirname + '/Views/index.html');
});

app.get("/about",function (req,res) {
    res.sendfile(__dirname + '/Views/about.html');
});

app.use(express.static("public"));

// escuchar
app.listen(9000);

console.log("Servidor corriendo en http://localhost:9000/");



