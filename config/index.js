const { env,argv } = require('process')
const PASSWORD = env.MYSQL_PASSWORD || argv.slice(-1)[0];
const config = {
  // 启动端口
  port: 8080,
  // 数据库配置
  database: {
    DATABASE: 'myblog',
    USERNAME: 'root',
    PASSWORD,
    PORT: '3306',
    HOST: 'foreverheart.top'
  }
}
 
// 域名白名单
// const ALLOW_ORIGIN = [ 
//   'abner520.top',
//   'foreverheart.top',
//   'localhost'
//  ]
 const ALLOW_ORIGIN = [ 
  'abner520.top',
  'foreverheart.top',
  'http://localhost:3000/'
 ]

module.exports = {
  ...config,
  ALLOW_ORIGIN
}