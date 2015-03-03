var request = require('request'),
    api_endpoint = process.env.API_ENDPOINT;

module.exports = api = {}

console.log(window);
if (window.document) {
  api_endpoint = window.document.baseURI;
}
console.log(api_endpoint);


api.getPlayers = function(cb) {
  var requestUrl = api_endpoint + 'spectate/getPlayers';
  request(requestUrl, function(err, response, body) {
    if (err){
      console.error(err);
      return cb(null, {status: 'fail', message: 'Cannot contact backend'});
    }
    return cb(null, JSON.parse(body));
  });
}

api.getData = function (region, player_name, cb) {
  var requestUrl = api_endpoint +'spectate/getInfo/'+ region +'/'+player_name;
  request(requestUrl, function(err, response, body) {
    if (err) {
      console.log(err);
      return cb(null, {status:'fail', message: 'Cannot contact backend!'});
    }
    return cb(null, JSON.parse(body));
  })
}
