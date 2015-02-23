var winston = require('winston'),
  services = {};

module.exports = services;

// Shared services

services.logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      level: 'verbose',
      timestamp: true,
      prettyPrint: true,
      colorize: true,
      handleExceptions: true
    })
  ]
});
