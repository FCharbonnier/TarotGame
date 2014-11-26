var Card = function(color, number)
{
	this.color = color;
	this.number = number;
	this.img = color + "_" + number + ".png";
};

module.exports = Card;