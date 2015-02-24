var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errors = require('common-errors'),
    morgan = require('morgan'),
    services = require('./services'),
    logger = services.logger,
    PORT_NUM = process.env.PORT || '8080',
    app = express();


module.exports = app;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/spectate', require('./routes/spectate'));

// Error Handler
app.use(errors.middleware.errorHandler);

// Since its included in the gulp file
if (!module.parent) {
  app.listen(PORT_NUM);
  logger.info('Server listening on port: %s', PORT_NUM );
}
