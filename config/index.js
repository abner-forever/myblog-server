const { PASSWORD } = process.env
const config = {
  // 启动端口
  port: 8080,
  // 数据库配置
  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'foreverheart.top'
  }
}
 
// 域名白名单
const ALLOW_ORIGIN = [ 
  'abner520.top',
  'foreverheart.top',
 ]

module.exports = config

export{
  ALLOW_ORIGIN
}