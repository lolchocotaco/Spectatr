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
