/**
 * spectate.js
 *  routes for the spectate player api
 *
 */


var express = require('express'),
    Api = require('../services/lol-api'),
    router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    message: "Welcome to the Spectatr API. :) 8===D"
  });
});

router.get('/getInfo/:region/:summoner_name', function (req, res, next) {
  var summoner_name = req.params.summoner_name,
      region = req.params.region;

  Api.getSpectateInfo(region, summoner_name, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });

});

// Expose the router
module.exports = router;
