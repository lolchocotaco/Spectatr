var express = require('express'),
  router = express.Router(),

module.exports = router;

router.get('/', function (req, res, next) {
  res.send('../index.html');
});
