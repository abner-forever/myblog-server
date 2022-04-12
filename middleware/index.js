// const { ALLOW_ORIGIN } = require('../config')


const resApplicationJson = (req,res,next)=>{
    // const currentOrigin = req.headers.referer;
    // console.log('currentOrigin',currentOrigin);
    // const whiteHost = ALLOW_ORIGIN.indexOf(currentOrigin) !== -1;
    // res.header("Access-Control-Allow-Origin", "*")
    res.set('content-type','appliction/json; charset=utf8')
    next();
}
module.exports = {
    resApplicationJson
}