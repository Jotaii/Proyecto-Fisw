
/*
// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'fisw',
    debug    :  false
});
module.exports = pool;

*/

var Db = require('mysql-activerecord');
var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '12345',
    database: 'fisw',
    reconnectTimeout: 2000
});
module.exports = db;