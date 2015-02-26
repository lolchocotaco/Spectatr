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

  for (var ind in summoners.players) {
    if (summoners.players[ind].name === summonerName) {
      return true;
    }
  }

  return false;
};
