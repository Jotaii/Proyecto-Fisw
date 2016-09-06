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