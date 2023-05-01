var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
const fileupLoad = require('../middleware/fileupload')

router.get('/userinfo',userController.userInfo);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/head',fileupLoad,userController.head);
router.post('/updateUserInfo',fileupLoad,userController.head);

module.exports = router;
