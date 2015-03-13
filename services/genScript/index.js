var genScript = {};

module.exports = genScript;


genScript.mac =  function (gameId, spectateKey) {
  var contents = "You are viewing the mac script: ";
  contents += gameId + " ";
  contents += spectateKey;
  return contents;
};


genScript.windows = function (gameId, spectateKey) {
  var contents = "You are viewing the windows script: ";
  contents += gameId + " ";
  contents += spectateKey;
  return contents;
};
