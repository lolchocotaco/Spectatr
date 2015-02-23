var express = require('express'),
  bodyParser = require('body-parser'),
  errors = require('common-errors'),
  morgan = require('morgan'),
  services = require('./services'),
  logger = services.logger,
  PORT_NUM = process.env.PORT || '8080',
  app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
// Routes
app.use(express.static(__dirname));
app.use('/', require('./resources/index'));

// Error Handler
app.use(errors.middleware.errorHandler);

if (!module.parent) {
  app.listen(PORT_NUM);
  logger.info('Server listening on port: %s', PORT_NUM );
}

