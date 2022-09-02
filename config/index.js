const { argv } = require('process')
const PASSWORD = argv.slice(2)[0]

const config = {
  // 启动端口
  port: 8080,
  // 数据库配置
  database: {
    DATABASE: 'blog',
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