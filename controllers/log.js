const apiModel = require('../lib/mysql.js')

// const logList = (req,res,next) => {
//     apiModel.insertData(['abner','123456','avator','time']).then(()=>{
//         console.log('ok');
//     });
//     res.json({
//         code:200,
//         msg:'ok'
//     })
// }
const logList = (req,res,next) => {
    apiModel.getUserById('1').then((res) => {
        console.log('ok', res);
    });
    res.json({
        code: 200,
        msg: 'ok'
    })
}

module.exports = {
    logList,
    // userInfo
}