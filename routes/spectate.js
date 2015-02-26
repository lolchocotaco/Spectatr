/**
 * spectate.js
 *  routes for the spectate player api
 *
 */

var express = require('express'),
    Api = require('../services/lol-api'),
    summonersSvc = require('../services/summoners');
    router = express.Router();


router.get('/', function (req, res, next) {
  res.json({
    message: "Welcome to the Spectatr API. :) 8===D"
  });
});

router.get('/getInfo/:region/:summoner_name', function (req, res, next) {
  var summoner_name = req.params.summoner_name,
      region = req.params.region;

  if (!summonersSvc.isValidSummoner(summoner_name)) {
    return res.status(403).send('forbidden');
  }

  Api.getSpectateInfo(region, summoner_name, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/getPlayers', function(req,res,next) {
  // Actually get players properly.
  var players = summonersSvc.getSummoners();
  res.json(players);
});

// Expose the router
module.exports = router;
