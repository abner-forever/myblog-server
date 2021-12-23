var express = require('express');
var router = express.Router();
var logController = require('../controllers/log')
const { resApplicationJson } = require('../middleware')

router.use(resApplicationJson)
/* GET users listing. */
router.get('/logList', logController.logList);

module.exports = router;