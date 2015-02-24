# Spectatr
[![Build Status](https://travis-ci.org/schauhan19/Spectatr.svg?branch=master)](https://travis-ci.org/schauhan19/Spectatr)

# Riot API
This app uses the Riot API to get information about summoners and matches. In order to connect to this
API you will need to either supply a valid API key to this application either as an environment variable
called API_KEY or in the git ignored file `services/lol-api/api_key.js`. The contents of that file should
be the following:

  var API_KEY = '<API_KEY_AS_A_STRING>';

  module.exports = {
    API_KEY: API_KEY
  };


Things to consider:
* is summoner data consistent across different region API calls. 
