var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', function(req, res, next) {
  res.render('error',{message:'404 page not found'})
});

module.exports = router;
