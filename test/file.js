const path = require('path');
const fs = require('fs')
//判断目录是否存在
try {
  let logpath = path.join(__dirname, '../logs/request.log')
  var stat = fs.statSync(path.join(__dirname, '../logs'));
  if(stat.isDirectory()){
    fs.unlinkSync(logpath);
  }
} catch (error) {
  console.log('定时清除日志任务不用执行',error)
}