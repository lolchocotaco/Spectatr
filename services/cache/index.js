/**
 *  cache.js
 *    Simple caching service to store values from the RIOT api to
 *    prevent us from getting rate limited
 *
 */

var memjs = require('memjs');
var mc = memjs.Client.create();

module.exports = cacheSvc = {};

/**
 * @function getValue
 * @param {String} namespace - cache value namespace
 * @param {Integer} timeout - expiration time (in seconds) for the cache value
 * @param {function} dataProvider - the function which provides the data if the cache value is stale
 *
 * Hit the cache to see if the value associated with namespace exists within the cache and
 * retrieve it if possible.
 *
 * If the value is stale or doesn't exist in the cache then get the value from
 * the dataProvider
 *
 */
cacheSvc.getValue = function (namespace, timeout, dataProvider, cb) {
  mc.get(namespace, function (err, cachedValue) {
    if (err) return cb(err);
    if (cachedValue) return cb(null, cachedValue);

    dataProvider(function (err, data) {
      if (err) return cb(err);
      
      mc.set(namespace, data, function(err, value) {
        cb(err, data);
      }, timeout);
    });
  });
};
