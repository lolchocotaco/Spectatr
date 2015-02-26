/**
 * summoners
 *  Return summoners info
 *
 */

var summoners = require('./summoners');

module.exports = summonersSvc = {};

summonersSvc.getSummoners = function() {
  return summoners.players;
};

summonersSvc.isValidSummoner = function(summonerName) {
  for (var summoner in summoners.players) {
    if (summoner.name === summonerName) {
      return true;
    }
  }

  return false;
};
