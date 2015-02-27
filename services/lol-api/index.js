var request = require('request'),
    text = require('../text-message'),
    async = require('async'),
    cache = require('../cache'),
    regions = require('./regionData');

// Get the API from env varibles or from the provided key file
var API_KEY = process.env.API_KEY;
var KEY_FILE = require('./api_key.js');
if (!API_KEY) {
  API_KEY = KEY_FILE.API_KEY;
}

module.exports = LOL_API = {};

// Template strings don't work :(
// var requestUrl = 'https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/${summoner_name}?api_key=${API_KEY}';
LOL_API.getSummonerInfo = function(region, summoner_name, cb) {

  text.sendMessage(null, null, null);
  var requestUrl = 'https://'+ regions[region.toLowerCase()].api_endpoint + '/api/lol/' +
    region + '/v1.4/summoner/by-name/' +
    summoner_name + '?api_key=' +
    API_KEY;

  // Attempts to retrieve information from cache.
  // If the value is not found then API information is used and stored
  cacheSvc.getValue(requestUrl, function(err, cachedValue) {
    if (err) return cb(err);
    if (cachedValue) return cb(null, JSON.parse(cachedValue.toString()));

    request.get(requestUrl, function (err, response, body) {
      if (err) return cb(err);
      // TODO: check for rate limit
      if (response.statusCode !== 200 ) {console.log(body); return cb(new Error('API error'))}
      cacheSvc.setValue(requestUrl, body, 3600, function (err, value) {
        cb(null, JSON.parse(body));
      });
    });
  });
};

// var requestUrl = 'https://${region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/${platform_id}/${player_id}?api_key=${API_KEY}';
LOL_API.getMatchInfo = function (region, player_id, cb) {
  var regionInfo = regions[region.toLowerCase()];

  var requestUrl = 'https://'+ regionInfo.api_endpoint + '/observer-mode/rest/consumer/getSpectatorGameInfo/' +
                    regionInfo.platform_id + '/' +
                    player_id + '?api_key=' +
                    API_KEY;

  cacheSvc.getValue(requestUrl, function(err, cachedValue) {
    if (err) return cb(err);
    if (cachedValue) {
      return cb(null, JSON.parse(cachedValue.toString()));
    }

    request.get(requestUrl, function (err, response, body) {
      if (err) return cb(err);
      var message;
      if (response.statusCode === 404) {
        message = {
          status : 'fail',
          message : 'Player is not in a game!'
        };
        message = JSON.stringify(message);
      } else if (response.statusCode === 429) {
        message = {
          status: 'fail',
          message: 'Rate limit exceeded'
        };
        message = JSON.stringify(message);
      } else {
        message = body;
      }

      cacheSvc.setValue(requestUrl, message, 60, function (err, value) {
        cb(null, JSON.parse(message));
      });
    });
  });
};


LOL_API.getSpectateInfo = function(region, name, cb) {
  var self = this;

  async.waterfall([
    function (callback) {
      self.getSummonerInfo(region, name, callback);
    },
    function (player_info, callback) {
      self.getMatchInfo(region, player_info[name.toLowerCase().replace(/ /g,'')].id, callback);
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
