/**
 * text-message
 *  Service to send text message to summoners notifying
 *  them to do something more useful with their free time.
 *
 */

// Credentials and other config
var KEY_FILE = require('./api_key.js');
var API_KEY = process.env.TWILIO_KEY ? process.env.TWILIO_KEY : KEY_FILE.API_KEY;
var AUTH_TOKEN = process.env.TWILIO_TOKEN ? process.env.TWILO_TOKEN : KEY_FILE.AUTH_TOKEN;
var PHONE_NUMBER = process.env.TWILIO_NUMBER ? process.env.TWILIO_NUMBER : KEY_FILE.PHONE_NUMBER;

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
TEXT_MESSAGE.sendMessage = function(message, address) {
  twilio.messages.create({
    body: message,
    to: address,
    from: PHONE_NUMBER,
  }, function(err, message) {
    console.log(message.sid);
    return;
  });
};
