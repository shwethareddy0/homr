var upcomingGames = [
  {
    // Test purposes only
    hometeam: "Warriors",
    opposing: "Lakers",
    date: "11/20/2022",
    time: "11:00 AM",
  },
  {
    // Test purposes only
    hometeam: "Warriors",
    opposing: "Lakers",
    date: "11/20/2022",
    time: "11:00 AM",
  },
  {
    // Test purposes only
    hometeam: "Warriors",
    opposing: "Lakers",
    date: "11/20/2022",
    time: "11:00 AM",
  },
]; // Temporary test variable for upcoming games

var game = {
  // Test purposes only
  hometeam: "Warriors",
  opposing: "Lakers",
  date: "11/20/2022",
  time: "11:00 AM",
};

var team = "Warriors"; // Temporary test variable
var savedGames = [];
var scheduleEl = $("#schedule");
var scheduleHeaderEl = $("#schedule-header");
var eventdayEl = $("#eventday");

function renderGames() {
  if (upcomingGames.length === 0) {
    scheduleHeaderEl.text("No upcoming games.");

    var titleEl = $('<h3 class="game-title"></h3>');
    titleEl.text(team + " have no games");
    eventdayEl.append(titleEl);

    return;
  }

  renderMainGame(upcomingGames[0]);

  scheduleHeaderEl.text(team + "'s Upcoming Games"); // Change variable name of team if needed

  if (upcomingGames.length === 1) {
    scheduleHeaderEl.text("No upcoming more games.");

    return;
  }

  for (var i = 1; i < upcomingGames.length; i++) {
    renderGame(upcomingGames[i]);
  }
}

function renderGame(game) {
  var gameEl = $('<div class="game"></div>');
  var titleEl = $('<h3 class="game-title"></h3>');
  titleEl.text(game.hometeam + " vs. " + game.opposing); // change based on how game element is constructed

  var dateEl = $('<p class="date"></p>');
  dateEl.text("date: " + game.date);
  var timeEl = $('<p class="time"></p>');
  timeEl.text("time: " + game.time);

  var saveBtnEl = $(
    '<button class="saveBtn button is-success is-outlined">Save</button>'
  );

  gameEl.append(titleEl);
  gameEl.append(dateEl);
  gameEl.append(timeEl);
  gameEl.append(saveBtnEl);
  scheduleEl.append(gameEl);
}

function renderMainGame(game) {
  var gameEl = $('<div class="main-game"></div>');
  var titleEl = $('<h1 class="main-title"></h1>');
  titleEl.text(game.hometeam + " vs. " + game.opposing); // change based on how game element is constructed

  var dateEl = $('<p class="main-date"></p>');
  dateEl.text("date: " + game.date);
  var timeEl = $('<p class="main-time"></p>');
  timeEl.text("time: " + game.time);

  var saveBtnEl = $(
    '<button class="saveBtn button is-success is-outlined">Save</button>'
  );

  gameEl.append(titleEl);
  gameEl.append(dateEl);
  gameEl.append(timeEl);
  gameEl.append(saveBtnEl);
  eventdayEl.append(gameEl);
}

// Load tickets:
// var priceEl = $('<p class="tickets"></p>');
// priceEl.text("ticket price: " + game.price);
// var buyTicketsEl = $('<a class="buy"></a>');
// buyTicketsEl.attr("src", game.buy);
// buyTicketsEl.text("Buy Tickets Now!");

function loadGamesFromStorage() {
  var savedGamesStringify = localStorage.getItem("saved games");
  if (savedGamesStringify) {
    savedGames = JSON.parse(savedGamesStringify);
  }
}

function saveGamesIntoStorage() {
  var game = {};
  var gameChildrenEl = $(this).parent().children(); // Change based on how game element is made
  game["title"] = gameChildrenEl.eq(0).text();
  game["date"] = gameChildrenEl.eq(1).text();
  game["time"] = gameChildrenEl.eq(2).text();
  savedGames.push(game);
  localStorage.setItem("saved games", JSON.stringify(savedGames));
}

loadGamesFromStorage();
renderGames();

// .saveBtn is name of button for saving specific game. change based on name of button
scheduleEl.on("click", ".saveBtn", saveGamesIntoStorage);
eventdayEl.on("click", ".saveBtn", saveGamesIntoStorage);
