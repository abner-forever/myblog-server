const db = require('../utils/mysqlConfig')

const crypto = require('crypto')

const getUserInfoById = () => {
    var sql = 'SELECT * FROM users';
    db.connection().query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        // console.log(result);  //数据库查询结果返回到result中
        return result
    });
}
module.exports = {
    getUserInfoById
}