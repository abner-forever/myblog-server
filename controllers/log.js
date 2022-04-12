const fs = require('fs')
const { handleData } = require('../utils');

const regText =  /(?<=\:\s).*(?=\n)/g   // 匹配 [: 和回车符之间的字符串 
const regTime = /(?<=\n).*(?=\d\:\s)/g   // 匹配起始位置和:空格的字符串 

// 日志列表
const logList = (req,res,next) => {
    try {
        const logFileMap = {
            'request':'./logs/request.log',
            'out':'./logs/out-0.log',
            'error':'./logs/error-0.log',
        }
        const requestType = req.query.type || 'request'
        const log_txt  = fs.readFileSync(logFileMap[requestType],"utf-8");
        const logList = []
        if(log_txt!==''){
            const time  = log_txt.match(regTime);
            const content  = log_txt.match(regText);
            for(let i=0;i<time.length;i++) {
                logList.push({
                    time:time[i],
                    content:content[i].trim(),
                    id:i
                })
            }
        }
        handleData(res, {
            list: logList,
            total: logList.length,
        })
    } catch (error) {
       console.error('logList-error',error)
       handleData(res,{
        error
       })
    }
}

module.exports = {
    logList,
}