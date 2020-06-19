const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'foreverheart.top',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog',
});
//数据库连接
connection.connect();
module.exports = connection;
