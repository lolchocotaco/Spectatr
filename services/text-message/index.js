/**
 * text-message
 *  Service to send text message to summoners notifying
 *  them to do something more useful with their free time.
 *
 */

// Twilio API creds
var API_KEY;
var AUTH_TOKEN;
var PHONE_NUMBER;

// Read the API Key
var KEY_FILE = require('./api_key.js');
if (!API_KEY) {
  API_KEY = KEY_FILE.API_KEY;
  AUTH_TOKEN = KEY_FILE.AUTH_TOKEN;
  PHONE_NUMBER = KEY_FILE.PHONE_NUMBER;
}

// Create text message service
var twilio = require('twilio')(API_KEY, AUTH_TOKEN);

module.exports = TEXT_MESSAGE = {}; // expose the module

/**
 * sendMessage {function}
 * message {String}
 * address {String}
 *
 * Send a text message to the specified address
 *
 */
TEXT_MESSAGE.sendMessage = function(message, address, cb) {
  client.messages.create({
    body: message,
    to: address,
    from: PHONE_NUMBER,
  }, function(err, message) {
    console.log(message.sid);
  });
};
