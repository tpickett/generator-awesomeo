'use strict';

<% if (awesomeo.express.extra['includeMongoose'] == true) { %>
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
  // Server = mongoose.model('Server'),
<% } %>
  var moment = require('moment');


  

var base = function(){
  var SELF = this;

  this.index = function(req, res){
    res.render('index');
  };

};

module.exports = base;