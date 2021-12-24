const { ALLOW_ORIGIN } = require('../config')

const resApplicationJson = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
    res.set('content-type','appliction/json; charset=utf8')
    next()
}
module.exports = {
    resApplicationJson
}