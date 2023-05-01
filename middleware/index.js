const { expressjwt } = require('express-jwt');
const {PRIVATE_KEY} = require('../config');

const checkToken = expressjwt({
    // 解析口令, 需要和加密的时候一致
    secret: PRIVATE_KEY,
    // 加密方式: SHA256 加密方式在 express-jwt 里面叫做 HS256
    algorithms: ['RS256']
}).unless({
    // 不需要验证 token 的路径标识符
    path: [
        '/api/users/login',
        '/api/users/head',
        '/api/users/register',
        '/',
        { url: /^\/api\/article\/.*/, methods: ['GET'] },
        { url: /^\/api\/.*/, methods: ['GET'] },
        { url: /^\/commonstatic\/.*/, methods: ['GET'] }
    ]
})

// // 自定义中间件，记录请求 header 信息
// const logHeaderMiddleware = (req, res, next) => {
//     // 记录请求 header 信息
//     const headers = req.headers;
//     const url = req.url;
//     const headerLog = `url:${url}Request Headers:\n${JSON.stringify(headers, null, 2)}\n`;
//     // 将 header 信息写入日志文件
//     log(headerLog)
//     // 将请求传递给下一个中间件或路由处理程序
//     next();
// };
module.exports = {
    checkToken
    // logHeaderMiddleware
}