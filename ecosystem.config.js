const { argv } = require('process')
const MYSQL_PASSWORD = argv.slice(-1)[0]

module.exports = {
  apps: [{
    name: 'blog_api',
    exec: './myblog.server.bundle.js',
    watch: './myblog.server.bundle.js',
    error_file: "./logs/error.log",//错误输出日志
    out_file: "./logs/info.log",  //日志
    log_date_format: "YYYY/MM/DD HH:mm:ss", //日期格式
    instances: 1,
    autorestart: true,
    restart_delay: 60,
    env: {
      NODE_ENV: 'production',
      MYSQL_PASSWORD
    }
  }],
  // deploy: {
  //   production: {
  //     user: 'root',
  //     host: '139.155.232.209',
  //     ref: 'origin/master',
  //     repo : "https://github.com/abner-forever/node-mysql.git",
  //     path : "/www/node/back",
  //     'pre-deploy-local': '',
  //     'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
