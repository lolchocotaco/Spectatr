var express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  errors = require('common-errors'),
  morgan = require('morgan'),
  services = require('./services'),
  logger = services.logger,
  db = services.db,
  PORT_NUM = process.env.PORT || '8000',
  app = express();

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
// Routes
app.use('/url', require('./routes/url'));

// Error Handler
app.use(errors.middleware.errorHandler);

if (!module.parent) {
  app.listen(PORT_NUM);
  logger.info('Server listening on port: %s', PORT_NUM );
}

