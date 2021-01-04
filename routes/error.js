var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function(req, res, next) {
  res.render('error',{message:'error-page 404'})
});

module.exports = router;
