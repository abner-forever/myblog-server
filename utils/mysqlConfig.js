const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'youpin',
});
//数据库连接
connection.connect(function (err) {
    if (err) {
        console.log("err:", err);
        return;
    }
});

module.exports = connection;
