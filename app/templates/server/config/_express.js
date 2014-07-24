'use strict';

var express = require('express'),
    <% if(awesomeo.express.extra['includeWinston'] == true){ %>
    winston = require('winston'),
    expressWinston = require('express-winston'),
    <% } %>
    <% if(awesomeo.express.extra['includePassport'] == true){ %>
    passport = require('passport'),
    <% } %>
    path = require('path'),
    config = require('./config');

<% if(awesomeo.express.extra['includePassport'] == true){ %>require('./passport')(passport); // pass passport for configuration<% } %>

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/server/views');
  });

  /*
  * @ToDo: finish the production setting
  */

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    <% if(awesomeo.express.extra['includePassport'] == true){ %>// required for passport
    app.use(passport.initialize());
    app.use(passport.session({ secret: 'AWESOMEO' })); // persistent login sessions
    <% } %>

    <% if(awesomeo.express.extra['includeWinston'] == true){ %>
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
        // ,new winston.transports.HTTP({
        //   host: "",
        //   port: 80,
        //   path: "",
        //   auth:"",
        //   ssl:""
        // })
      ],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}" // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    }));
    <% }else{ %>
    app.use(express.logger('dev'));
    <% } %>

    // Router needs to be last
    app.use(app.router);
  });
};