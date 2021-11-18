const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('../config')

var mysqlOption = {
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    port: database.PORT,
    database: database.DATABASE,
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
//数据库连接
var sessionStore = new MySQLStore({},sqlconnection)
module.exports = sessionStore;
