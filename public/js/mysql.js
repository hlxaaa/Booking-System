var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'woaini1314',
	database : 'txy'
});
connection.connect();
