var express = require('express');
var router = express.Router();
var logController = require('../controllers/log')

/* GET users listing. */
router.get('/list', logController.logList);


module.exports = router;