var savedGames = [];
var gamesEl = $('#games'); // Change depending on name of section with upcoming games
var game = {
    hometeam: "Warriors",
    opposing: "Lakers",
    date: "11/20/2022",
    time: "11:00 AM"
}


function renderGame(game) {
    var gameEl = $('<div class="game"></div>');
    var titleEl = $('<h3 class="title"></h3>');
    titleEl.text(game.hometeam + " vs." + game.opposing) // change based on how game element is constructed

    var dateEl = $('<p class="date"></p>');
    dateEl.text("date: " + game.date);
    var timeEl = $('<p class="time"></p>');
    timeEl.text("time: " + game.time);

    gameEl.append(titleEl);
    gameEl.append(dateEl);
    gameEl.append(timeEl);
    gamesEl.append(gameEl);
}

// Load tickets:
    // var priceEl = $('<p class="tickets"></p>');
    // priceEl.text("ticket price: " + game.price);
    // var buyTicketsEl = $('<a class="buy"></a>');
    // buyTicketsEl.attr("src", game.buy);
    // buyTicketsEl.text("Buy Tickets Now!");

renderGame(game);
