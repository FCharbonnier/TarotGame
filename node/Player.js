var Player = function(name)
{
	this.name = name;
	this.cards = [];
};

Player.prototype.addCardsToHand = function(cards)
{
	this.cards = this.cards.concat(cards);
};

module.exports = Player;