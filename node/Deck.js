var Card = require("./Card.js");

var Deck = function()
{
	this.nbCards = 78;
	this.cards = [];
};

Deck.prototype.init = function()
{
	delete this.card;

	this.cards = [];

	var self = this;

	var colors = ["pique", "coeur", "trefle", "carreau"];
	var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "C", "Q", "K"];

	colors.forEach(function(colorsElement)
	{
		numbers.forEach(function(numbersElement)
		{
			self.cards.push(new Card(colorsElement, numbersElement))
		});
	});

	var tarots = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "E"];

	tarots.forEach(function(tarotsElement)
	{
		self.cards.push(new Card("atout", tarotsElement));
	});
};

Deck.prototype.shuffle = function()
{
	var saveCards = this.cards.slice();

	for (var i = saveCards.length-1 ; i >=0 ; i--)
	{
		var randomIndex = Math.floor(Math.random()*(i+1)); 
		var itemAtIndex = saveCards[randomIndex]; 

		saveCards[randomIndex] = saveCards[i]; 
		saveCards[i] = itemAtIndex;
	}

	this.cards = saveCards;
};

Deck.prototype.cut = function()
{
	var saveCards = this.cards.slice();

	var cut = (Math.random() * 70) + 4;

	this.cards = [];

	this.cards = this.cards.concat(saveCards.slice(cut, 78));
	this.cards = this.cards.concat(saveCards.slice(0, cut));
};

module.exports = Deck;