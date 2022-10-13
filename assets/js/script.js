var upcomingGames = [
    { // Test purposes only
        hometeam: "Warriors",
        opposing: "Lakers",
        date: "11/20/2022",
        time: "11:00 AM"
    },
    { // Test purposes only
        hometeam: "Warriors",
        opposing: "Lakers",
        date: "11/20/2022",
        time: "11:00 AM"
    },
    { // Test purposes only
        hometeam: "Warriors",
        opposing: "Lakers",
        date: "11/20/2022",
        time: "11:00 AM"
    }
]; // Temporary test variable for upcoming games

var team = "Warriors"; // Temporary test variable
var gamesEl = $('#games'); // Change depending on name of section with upcoming games
var gamesHeaderEl = $('#games-header'); // Change depending on name of section with upcoming games
var game = { // Test purposes only
    hometeam: "Warriors",
    opposing: "Lakers",
    date: "11/20/2022",
    time: "11:00 AM"
}

function renderGames() {
    if(upcomingGames.length === 0) {
        gamesHeaderEl.text("No upcoming games.");
        return;
    }

    renderFirstGame(upcomingGames[0]);

    gamesHeaderEl.text(team + "'s Upcoming Games"); // Change variable name of team if needed

    for(var i = 1; i < upcomingGames.length; i++) {
        renderGame(upcomingGames[i]);
    }

}

function renderGame(game) {
    var gameEl = $('<div class="game"></div>');
    var titleEl = $('<h3 class="title"></h3>');
    titleEl.text(game.hometeam + " vs. " + game.opposing) // change based on how game element is constructed

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

renderGames();
