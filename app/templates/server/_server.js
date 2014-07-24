'use strict';

var express = require('express'),
	path = require('path'),
	<% if (awesomeo.express.extra['includeMongoose'] == true) { %>mongoose = require('mongoose'),<% } %>
	<% if (awesomeo.express.extra['includeSocket'] == true) { %>io = require('socket.io'),<% } %>
	<% if (awesomeo.express.extra['includeRedis'] == true) { %>redis = require('redis'),<% } %>
	fs = require('fs');
/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./config/config');

<% if (awesomeo.express.extra['includeMongoose'] == true) { %>
// Connect to database
var db = mongoose.connect('mongodb://'+config.db.mongo.host+'/<%= _.slugify(_.humanize(awesomeo.name)) %>', config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
	require(modelsPath + '/' + file);
  }
});
<% } %>
<% if (awesomeo.express.extra['includeRedis'] == true) { %>
 var redis_db = redis.createClient(config.db.redis.port, config.db.redis.host, config.db.redis.options);
<% } %>	
var app = express();

// Express settings
require('./config/express')(app);

// Start server
var server = app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

<% if (awesomeo.express.extra['includeSocket'] == true) { %>
//socket.io and routing
require('./lib/sockets')(io, server, config, app);
<% }else{ %>
// Routing
require('./lib/routes')(app);
<% } %>

// Expose app
exports = module.exports = app;