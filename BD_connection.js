// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'palpadv2',
    database : 'fisw',
    debug    :  false
});
module.exports = pool;