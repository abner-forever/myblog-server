const path = require('path');
const fs = require('fs')

function log(res) {
    let options = {
        flags: 'a', // 
        encoding: 'utf8', // utf8编码
    }
    let logpath = path.join(__dirname, '../log/request.log')
    let stderr = fs.createWriteStream(logpath, options);
    let logger = new console.Console(stderr);
    let timestamp = new Date().toLocaleString()
    logger.log(`[${timestamp}]: ${res}`);
}
function handleError(err) {
    if (err) {
        // 如果是连接异常，自动重新连接
        log('[SELECT ERROR]:' + JSON.stringify(err));
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code === 'ETIMEDOUT') {
            mysql.connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

module.exports ={
    log,
    handleError
}