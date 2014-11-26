var Card = require("./Card.js");
var Player = require("./Player.js");
var Deck = require("./Deck.js");
var Game = require("./Game.js");

var http = require('http');

httpServer = http.createServer(function(req, res){});

httpServer.listen(90);

var io = require('socket.io').listen(httpServer);

var games = [];

var playersName = [];

io.sockets.on('connect', function(socket)
{
	var name = null;

	socket.on('disconnect', function()
	{
		//TODO la déconnexion
	});

	socket.on('newPlayer', function(dataObject)
	{
		if(playersName[dataObject.name])
		{
			dataObject.error = "already_used";
			socket.emit("newPlayer", dataObject);
		} else
		{
			playersName[dataObject.name] = true;

			socket.join("GAME_SELECT");

			name = dataObject.name;

			socket.emit("newPlayer", dataObject);
		}
	});

	socket.on('getGames', function()
	{
		socket.emit('getGames', games);
	});

	socket.on('createGame', function(dataObject)
	{
		game = new Game(dataObject.name, dataObject.creator);

		games[game.id.toString()] = game;

		io.sockets.in("GAME_SELECT").emit('getGames', game);
	});

	socket.on('removeGame', function(dataObject)
	{
		delete games[dataObject.id];

		io.sockets.in("GAME_SELECT").emit('removeGame', dataObject.id);
	});

	socket.on('joinGame', function(dataObject)
	{
		//TODO
	});
});