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

  for (var player of summoners.players) {
    if (player.name === summonerName) {
      return true;
    }
  }

  return false;
};
