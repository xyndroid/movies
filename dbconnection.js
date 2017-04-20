var mysql = require('mysql');
var fs = require('fs');
var config = '/Users/Natsagaa/Documents/UK/CS405/project/config';
var host;
var user;
var pswd;
var db;

var databaseConfig = fs.readFileSync(config, 'utf8');

databaseConfig = databaseConfig.split('\n');

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : databaseConfig[0],
    user     : databaseConfig[1],
    password : databaseConfig[2],
    database : databaseConfig[3],
    debug    :  false
});

module.exports = pool;
