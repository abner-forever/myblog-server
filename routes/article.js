var express = require('express');
var router = express.Router();
var articleController = require('../controllers/article')
// const resApplicationJson = (req,res,next)=>{
//     res.set('content-type','appliction/json; charset=utf8')
//     next()
// }
// router.use(resApplicationJson)
/* GET users listing. */
router.get('/articleList', articleController.articleList);

module.exports = router;
