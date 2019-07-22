var express = require('express');
var router = express.Router();
var articleController = require('../controllers/user')
// const resApplicationJson = (req,res,next)=>{
//     res.set('content-type','appliction/json; charset=utf8')
//     next()
// }
// router.use(resApplicationJson)
/* GET users listing. */
router.get('/articleList', articleController);

module.exports = router;
