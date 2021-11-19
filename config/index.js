const { PASSWORD } = process.env
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

module.exports = config