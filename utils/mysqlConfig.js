const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);

var mysqlOption = {
    host: 'foreverheart.top',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'blog',
    useConnectionPooling: true,
	schema:{
		tableName: 'session',
		columnNames:{
			session_id: 'session_id',
            expires: 'expires',
            data: 'data'
		}
	}
};
 
var sqlconnection = mysql.createConnection(mysqlOption)
//数据库连接ß
var sessionStore = new MySQLStore({},sqlconnection)
module.exports = sessionStore;
