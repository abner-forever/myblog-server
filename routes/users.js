var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
// const resApplicationJson = (req,res,next)=>{
//     res.set('content-type','appliction/json; charset=utf8')
//     next()
// }
// router.use(resApplicationJson)
router.get('/userinfo',userController.userInfo);
router.get('/register',userController.register);

module.exports = router;
