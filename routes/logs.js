var express = require('express');
var router = express.Router();
var logController = require('../controllers/log')
const resApplicationJson = (req,res,next)=>{
    res.set('content-type','appliction/json; charset=utf8')
    next()
}
router.use(resApplicationJson)
/* GET users listing. */
router.get('/logList', logController.logList);

module.exports = router;