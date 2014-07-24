<% if(awesomeo.express.extra['includeMongoose'] == true) { %>var mongoose = require('mongoose');<% } %>

var sockets = function(io, server, config, app) {

var socket = io.listen(server);

	//socket.io config
	socket.configure(function() {
		socket.set('log level', 1);
		socket.set('heartbeat timeout', 27);
	});

	

	var client = socket.of('/client').on('connection', function (socket) {
		// var clientSockets = new clientController(client, socket);
		// Broadcast message to everyone in this namespace
		client.emit('welcome', { msg: 'welcome to the client namespace!' });
		/*
		*	Client actions
		*/
	
	});

	
	// Routing
	require('./routes')(app, client, socket);
			

};

module.exports = sockets;