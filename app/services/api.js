var request = require('request'),
  api_endpoint = process.env.api_endpoint || document.location.href ||'http://localhost:8080';

module.exports = api = {}

api.getData = function (region, player_name, cb) {
  var requestUrl = api_endpoint +'spectate/getInfo/'+ region +'/'+player_name;
  request(requestUrl, function(err, response, body) {
    if (err) {
      console.log(err);
      return cb(null, {status:'fail', message: 'Cannot contact backend!'});
    }
    return cb(null,JSON.parse(body));

  })
}
