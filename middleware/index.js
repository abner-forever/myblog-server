const fs = require('fs')
var path = require('path');
const { expressjwt } = require('express-jwt')

let private_key = fs.readFileSync(path.join(__dirname, '../key/private_key.pem'))

const resApplicationJson = (req,res, next) => {
    res.set('content-type', 'appliction/json; charset=utf8')
    next();
}

const checkToken = expressjwt({
    // 解析口令, 需要和加密的时候一致
    secret: private_key,
    // 加密方式: SHA256 加密方式在 express-jwt 里面叫做 HS256
    algorithms: ['RS256']
}).unless({
    // 不需要验证 token 的路径标识符
    path: [
        '/api/users/login',
        '/banner',
        '/api/article/articleList',
        '/api/article/getArticle',
        '/'
    ]
})

module.exports = {
    resApplicationJson,
    checkToken
}