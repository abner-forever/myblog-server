var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function (req, res, next) {
  res.status(404);
  res.json({ code: 404, message: '资源未找到' })
});

module.exports = router;
