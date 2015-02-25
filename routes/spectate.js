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

router.get('/getPlayers', function(req,res,next) {
  // Actually get players properly.
  var players = [
    {
      name: 'HippoBirth',
      region: 'NA'
    },
    {
     name: 'LikelyToDie',
     region: 'NA'
    },
    {
      name: 'imaqtpie',
      region: 'NA'
    },
    {
      name: 'ObligatoryHam',
      region: 'NA'
    },
    {
      name:'kenman21',
      region: 'NA'
    },
    {
      name:'BrainStorm',
      region: 'NA'
    }
  ];

  res.json(players);
});

// Expose the router
module.exports = router;
