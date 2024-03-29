var cron = require('node-cron');
const path = require('path');
const { juejin } = require('./juejin_sign')
const { juejin_wenchang } = require('./juejin_sign_wenchang')

// const fs = require('fs');
// let time = 0
const clearLog = () => {
  let logpath = path.join(__dirname, '../logs/out-0.log')
  // cron.schedule('* * 1 * *', () => {  // 每个月清除一次请求日志
  //   console.log('定时任务执行啦');
  //   //判断目录是否存在
  //   try {
  //     var stat = fs.statSync(path.join(__dirname, '../logs'));
  //     if(stat.isDirectory()){
  //       fs.unlinkSync(logpath);
  //       console.log('清除日志成功')
  //     }
  //   } catch (error) {
  //     console.log('定时清除日志任务不用执行',error)
  //   }
  // });
}

const sign = () => {
  cron.schedule('0 10 * * *', () => {  // 每天上午10点执行
    juejin();
    juejin_wenchang();
  });
}
module.exports = {
  clearLog,
  sign
}