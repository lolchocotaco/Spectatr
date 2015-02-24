var express = require('express'),
  Api = require('../services/lol-api'),
  router = express.Router()

module.exports = router;

router.get('/', function (req, res, next) {
  res.json({
    message: "Welcome to the Spectatr API. :) "
  });
});


router.get('/getInfo/:region/:summoner_name', function (req, res, next) {
  var summoner_name = req.params.summoner_name,
    region = req.params.region;

  Api.getSpectateInfo(region, summoner_name, function (err, data) {
    // if (err) {
    //   return res.json({
    //     status : 'fail',
    //     message : 'Player is not in a game or something'
    //   });
    // };
    if (err) return next(err);
    data.api = process.env.API_KEY;
    res.json(data);
  });

})
