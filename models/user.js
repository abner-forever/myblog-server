const mysql = require('../utils/mysqlConfig')
const crypto = require('crypto')

const getUserInfoById = async (id, callback) => {
    var sql = `SELECT phone,userName,userId,sex FROM blog_users where blog_users.userId = ${id}`;
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        if (result.length > 0) {
            callback(result[0])
        }
    });
}
const login = async (pwd, { password }) => {
    const secret = 'abcdefg'
    const _password = await crypto.createHmac('sha256', secret).update(pwd).digest('hex')
    //相等返回true
    return (_password === password)
}
const checkUserByusername = async (userName,callback)=>{
    var sql = `SELECT userName FROM blog_users where blog_users.userName = ${userName}`;
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        if (result.length > 0) {
            callback(result[0])
        }
    });
}
module.exports = {
    getUserInfoById,
    login,
    checkUserByusername
}