/**
 * api.js
 *  Communicate with the Spectatr server to get information on players and matches
 */
var request = require('request'),
  async = require('async');
var api_endpoint = window.document.baseURI;

module.exports = api = {};

api.getPlayers = function (cb) {
  var requestUrl = api_endpoint + 'spectate/getPlayers';
  request(requestUrl, function(err, response, body) {
    if (err){
      console.error(err);
      return cb(null, {status: 'fail', message: 'Cannot contact backend'});
    }
    return cb(null, JSON.parse(body));
  });
};

api.getData = function (region, player_name, cb) {
  var requestUrl = api_endpoint +'spectate/getInfo/'+ region +'/'+player_name;
  request(requestUrl, function(err, response, body) {
    if (err) {
      console.error(err);
      return cb(null, {status:'fail', message: 'Cannot contact backend!'});
    }
    return cb(null, JSON.parse(body));
  });
};

api.getAllData = function (cb) {
  var requestUrl = api_endpoint + 'spectate/playerData';
  request(requestUrl, function (err, response, body) {
    if (err) {
      console.error(err);
      return cb(null, {status:'fail', message: 'Cannot contact backend!'});
    }
    return cb(null, JSON.parse(body));
  });
};
