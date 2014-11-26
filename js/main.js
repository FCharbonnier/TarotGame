$(function()
{
	var game = new Game("Jeu Test");

	console.log(game.addPlayer("Franck"));
	console.log(game.start());
	console.log(game.addPlayer("Erwan"));
	console.log(game.addPlayer("Richard"));
	console.log(game.addPlayer("Tarik"));
	console.log(game.addPlayer("Benjamin"));
	console.log(game.addPlayer("Antoine"));
	console.log(game.start());

	game.deal();

	game.players.forEach(function(player)
	{
		$("body").append("<div>");
		player.cards.forEach(function(card)
		{
			$("body").append("<img src='./cards/" + card.img + "'/>");
		});
		$("body").append("</div>");
	});
});



