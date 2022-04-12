const { env } = require('process')
const logUtil = require('../utils/logUtil')
const PASSWORD = env.MYSQL_PASSWORD||'123456';
// logUtil.log(`config-log-${JSON.stringify(env.MYSQL_PASSWORD)}`);
const config = {
  // 启动端口
  port: 8080,
  // 数据库配置
  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: PASSWORD,
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