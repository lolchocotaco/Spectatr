/**
 *  cache.js
 *    Simple caching service to store values from the RIOT api to
 *    prevent us from getting rate limited
 *
 */

var memjs = require('memjs'),
  mc = memjs.Client.create(),
  TIMEOUT = 60; // 1 minute timeout

module.exports = cacheSvc = {};

/**
 * @function getValue
 * @param {String} key - cache key
 *
 * Hit the cache to see if the value associated with key exists within the cache and
 * retrieve it if possible.
 *
 *
 */
cacheSvc.getValue = function (key, cb) {
  mc.get(key,cb);
}

cacheSvc.setValue = function (key, value, cb) {
  mc.set(key, value, cb, TIMEOUT)
}
