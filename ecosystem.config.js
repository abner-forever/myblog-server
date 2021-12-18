module.exports = {
  apps: [{
    name: 'blog_api',
    script: './bin/www',
    watch: '.',
    error_file: "./logs/error.log",//错误输出日志
    out_file: "./logs/out.log",  //日志
    log_date_format: "YYYY-MM-DD HH:mm Z", //日期格式
    instances: 1,
    autorestart: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
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
