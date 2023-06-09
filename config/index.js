const { env, argv } = require('process')
const fs = require('fs')
const path = require('path');

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

const pathMap = {
  'development': '../key/private_key.pem',
  'production': '../../key/private_key.pem'
}

let PRIVATE_KEY = fs.readFileSync(path.join(__dirname, pathMap[env.NODE_ENV]))

module.exports = {
  ...config,
  ALLOW_ORIGIN,
  PRIVATE_KEY
}