const { argv } = require('process');
const MYSQL_PASSWORD = argv[argv.length - 1];
console.log('ecosystem.config.js-MYSQL_PASSWORD', MYSQL_PASSWORD);
module.exports = {
  apps: [{
    name: 'blog_api',
    script: './bin/www',
    watch: '.',
    error_file: "./logs/error.log",//错误输出日志
    out_file: "./logs/out.log",  //日志
    log_date_format: "YYYY/MM/DD HH:mm:ss", //日期格式
    instances: 1,
    autorestart: true,
    restart_delay: 60,
    env: {
      NODE_ENV: 'development',
      MYSQL_PASSWORD
    },
    env_production: {
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
