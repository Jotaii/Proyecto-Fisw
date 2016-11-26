
var Db = require('mysql-activerecord');
var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '1234',
    database: 'fisw2',
    reconnectTimeout: 2000
});
module.exports = db;
