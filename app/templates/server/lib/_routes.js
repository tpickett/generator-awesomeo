'use strict';

var base = require('../controllers/base');
<% if(awesomeo.express.extra['includePassport'] == true){ %>var passport = require('passport'); <% } %>

/*
* route middleware to make sure a user is logged in
*/
var isLoggedIn = function(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.send('not logged in!');
}

/**
 * API Routes
 */
module.exports = function(app<% if (awesomeo.express.extra['includeSocket'] == true) { %>, socket<% } %>) {

  // var api = new expressAPI(socket);

  // //domain specific routes
  // app.get('/api/awesome-sauce', api.getAwesomeSauce);
  <% if(awesomeo.express.extra['includePassport'] == true){ %>
  app.get('/api/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
  }));
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
  }));
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
  }));
  app.post('/api/user/', isLoggedIn, function(req, res) {
    console.log(req.user);
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  <% } %>

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  //app.get('/partials/*', index.partials);
  app.get('/*', new base().index);
};
