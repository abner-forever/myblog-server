var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function(req, res, next) {
  res.send('访问的页面不存在');
});

module.exports = router;
