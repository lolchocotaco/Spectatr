var request = require('request'),
  API_KEY = process.env.API_KEY;

module.exports = LOL_API = {};

function getRegionUrl(summoner_name) {
  var region = 'kr',
    url = 'https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/by-name/faker?api_key=${API_KEY}';

  return url;
}


LOL_API.getSummonerInfo = function(name, cb) {
  var requestUrl = getRegionUrl(name);
  
}
