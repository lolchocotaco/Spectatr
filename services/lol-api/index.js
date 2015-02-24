var request = require('request'),
  async = require('async'),
  API_KEY = process.env.API_KEY;

module.exports = LOL_API = {};

LOL_API.getSummonerInfo = function(region, summoner_name, cb) {
  var requestUrl = 'https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${summoner_name}?api_key=${API_KEY}';
  console.log(requestUrl);
  request.get(requestUrl, function (err, response, body) {
    if (err) return cb(err);
    cb(null, body);
  })
}


LOL_API.getMatchInfo = function (region, player_id, cb) {
  var platform_id = 'KR'; // TODO: MAP region to platformID
  var requestUrl =
   'https://${region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/${platform_id}/${player_id}?api_key=${API_KEY}';
   console.log(requestUrl);
  request.get(requestUrl, function (err, response, body) {
    if (err) return cb(err);
    cb(null, body);
  })
}


LOL_API.getSpectateInfo = function(region, name, cb) {
  var self = this;
  async.waterfall([
    function (callback) {
      self.getSummonerInfo(region, name, callback);
    },
    function (player_info, callback) {
      self.getMatchInfo(region, player_info[name].id, callback)
    }
  ], function (err, results) {
    if (err) return cb(err);
    cb(null, {
      gameId: results.gameId,
      spectateKey : results.observers.encryptionKey
    })
  })

}
