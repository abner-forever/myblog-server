const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'foreverheart.top',
    user: 'youpin',
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
