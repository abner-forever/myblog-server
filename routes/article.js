var express = require('express');
var router = express.Router();
var articleController = require('../controllers/article')
const { resApplicationJson } = require('../middleware')

router.use(resApplicationJson)
/* GET users listing. */
router.get('/articleList', articleController.articleList);
router.get('/getArticle', articleController.getArticle);
router.get('/myarticleList', articleController.myarticleList);
router.get('/getArticleComments', articleController.getArticleComments);


router.post('/addArticle', articleController.addArticle);
router.post('/updateArticle', articleController.updateArticle);
router.post('/removeArticle', articleController.removeArticle);

router.post('/addComment', articleController.addComment);
router.post('/removeComment', articleController.removeComment);

module.exports = router;
