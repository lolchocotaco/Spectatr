var request = require('request'),
    async = require('async'),
    cache = require('../cache');

// Get the API from env varibles or from the provided key file
var API_KEY = process.env.API_KEY;
var KEY_FILE = require('./api_key.js');
if (!API_KEY) {
  API_KEY = KEY_FILE.API_KEY;
}

module.exports = LOL_API = {};

// Template strings don't work :(
//  var requestUrl = 'https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${summoner_name}?api_key=${API_KEY}';
LOL_API.getSummonerInfo = function(region, summoner_name, cb) {
  var requestUrl = 'https://' +
                    region + '.api.pvp.net/api/lol/' +
                    region + '/v1.4/summoner/by-name/' +
                    summoner_name + '?api_key=' +
                    API_KEY;

  cacheSvc.getValue(requestUrl, 10000, function(callback) {
    request.get(requestUrl, function (err, response, body) {
      callback(err, JSON.parse(body));
    });
  }, cb);
};

// var requestUrl = 'https://${region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/${platform_id}/${player_id}?api_key=${API_KEY}';
LOL_API.getMatchInfo = function (region, player_id, cb) {
  var platform_id = 'NA1'; // TODO: MAP region to platformID
  region = 'na';

  var requestUrl = 'https://' +
                    region + '.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/' +
                    platform_id + '/' +
                    player_id + '?api_key=' +
                    API_KEY;

  request.get(requestUrl, function (err, response, body) {
    if (err) return cb(err);
    if (response.statusCode === 404) {
      return cb(null, {
        status : 'fail',
        message : 'Player is not in a game!'
      });
    }
    cb(null, JSON.parse(body));
  });
};


LOL_API.getSpectateInfo = function(region, name, cb) {

  var self = this;
  async.waterfall([
    function (callback) {
      self.getSummonerInfo(region, name, callback);
    },
    function (player_info, callback) {
      self.getMatchInfo(region, player_info[name.toLowerCase()].id, callback);
    }
  ], function (err, spectate_data) {
    if (err) return cb(err);
    if (spectate_data.status === 'fail') { return cb(null, spectate_data); }

    cb(null, {
      status : 'success',
      message :'Player is in a game!',
      gameId: spectate_data.gameId,
      spectateKey : spectate_data.observers.encryptionKey
    });
  });
};
