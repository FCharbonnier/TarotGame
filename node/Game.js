var Player = require("./Player.js");
var Deck = require("./Deck.js");

var Game = function(gameName, creator)
{
	this.id = new Date().getTime();
	this.creator = creator;
	this.players = [];
	this.dog = [];
	this.match = [];
	this.deck = null;
	this.name = gameName;
	this.nbPlayers = 0;
};

Game.prototype.addPlayer = function(playerName)
{
	if(this.nbPlayers < 5)
	{
		this.players.push(new Player(playerName));
		
		this.nbPlayers++;

		return true;
	}
	else
	{
		return false;
	}
};

Game.prototype.start = function()
{
	if(this.nbPlayers > 2)
	{
		this.deck = new Deck();
		this.deck.init();
		this.deck.shuffle();

		return true;
	} else
	{
		return false;
	}
};

Game.prototype.deal = function()
{
	this.deck.cut();

	delete this.dog;
	this.dog = [];

	var nPlayer = 0;

	var dogSize = this.nbPlayers == 5 ? 3 : 6;

	for (var  i = 0 ; i < this.deck.nbCards ; i += 3)
	{
		var cardsToGive = [];

		cardsToGive.push(this.deck.cards[i]);
		cardsToGive.push(this.deck.cards[i+1]);
		cardsToGive.push(this.deck.cards[i+2]);

		this.players[nPlayer++%this.nbPlayers].addCardsToHand(cardsToGive);

		if(	(Math.random() < 0.33 && this.dog.length < dogSize) ||
			(this.dog.length == dogSize-6 && i == 54) ||
			(this.dog.length == dogSize-5 && i == 58) ||
			(this.dog.length == dogSize-4 && i == 62) ||
			(this.dog.length == dogSize-3 && i == 66) ||
			(this.dog.length == dogSize-2 && i == 70) ||
			(this.dog.length == dogSize-1 && i == 74))
		{
			this.dog.push(this.deck.cards[i+3]);
			i++;
		}
	}
};

module.exports = Game;