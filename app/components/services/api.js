var request = require('request'),
  api_endpoint = process.env.api_endpoint || 'localhost:8080/spectate';

module.exports = api = {}

api.getData = function(region, player_name, cb) {
  var requestUrl = api_endpoint +'/'+ region +'/'+player_name;
  request(requestUrl, function(err, response, body) {
    if (err) {
      return cb({message: 'Cannot contact backend!'});
    }
    var data = JSON.parse(body);

    if (data.body == 'success') return cb(data);
    return(cb)
    // return something if something screwed up
    // data.message should exist

  })
}
