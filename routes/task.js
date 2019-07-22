var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
// const resApplicationJson = (req,res,next)=>{
//     res.set('content-type','appliction/json; charset=utf8')
//     next()
// }
// router.use(resApplicationJson)
/* GET users listing. */
router.get('/task', function(req, res, next) {
    res.render('task',{ title: '任务' });
  });

module.exports = router;
