var mysql = require('mysql');
var fs = require('fs');
var config = '../config.txt';

var databaseConfig = fs.readFileSync(config, 'utf8');

databaseConfig = databaseConfig.split('\n');

var pool = mysql.createPool({
  connectionLimit : 100, //importan
	host: '127.0.0.1',
	user: 'root',
	password: '[Chingis8]',
	database: 'mydb'
//    debug    :  false
});

pool.query('select * from movie', function (error, result) {
  if(error){
    console.log('error');
  }else{
    console.log('connection');
  }
});
module.exports = pool;
