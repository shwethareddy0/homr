var mlbSchedule = [
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
var teamEl = $("#team");
var savedGames = [];
var scheduleEl = $("#schedule");
var scheduleHeaderEl = $("#schedule-header");
var eventdayEl = $("#eventday");

function renderGames() {
  team = document.location.href.split("#")[1];
  teamEl.text(team);
  if (mlbSchedule.length === 0) {
    scheduleHeaderEl.text("Season is over.");

    // var titleEl = $('<h3 class="game-title"></h3>');
    // titleEl.text(team + " have no games");
    // eventdayEl.append(titleEl);

    return;
  }

  scheduleHeaderEl.text(team + "'s Upcoming Games"); // Change variable name of team if needed

  var teamKey = findTeamCode(team);

  for (var i = 0; i < 3; i++) {
    if (mlbSchedule[i].homeTeam === teamKey) {
      renderGame(mlbSchedule[i], "home team");
    } else if (mlbSchedule[i].awayTeam === teamKey) {
      renderGame(mlbSchedule[i], "away team");
    }
  }
}

function renderGame(game, awayHome) {
  var gameEl = $('<div class="game"></div>');
  var titleEl = $('<h3 class="game-title"></h3>');
  var homeTeam = "";
  var awayTeam = "";
  if (awayHome === "home team") {
    homeTeam = team;
    var awayTeam = findOpposingTeam(game.awayTeam);
  } else {
    awayTeam = team;
    var homeTeam = findOpposingTeam(game.homeTeam);
  }
  
  titleEl.text(homeTeam + " vs. " + awayTeam); // change based on how game element is constructed

  var awayHomeEl = $('<p class="awayHome"></p>');
  awayHomeEl.text("away or home: " + awayHome);
  
  var dateEl = $('<p class="date"></p>');
  dateEl.text("date: " + game.gameDay);
  var timeEl = $('<p class="time"></p>');
  timeEl.text("time: " + game.gameTime);

  var saveBtnEl = $(
    '<button class="saveBtn button is-success is-outlined">Save</button>'
  );

  gameEl.append(titleEl);
  gameEl.append(dateEl);
  gameEl.append(timeEl);
  gameEl.append(saveBtnEl);
  scheduleEl.append(gameEl);
}

function findOpposingTeam(opposingTeam) {
  for(var i = 0; i < mlbTeams.length; i++) {
    if (mlbTeams[i].teamKey === opposingTeam) {
      return mlbTeams[i].teamName;
    }
  }
  return "invalid team";
}

function findTeamCode() {
  for(var i = 0; i < mlbTeams.length; i++) {
    if (mlbTeams[i].teamName === team) {
      return mlbTeams[i].teamKey;
    }
  }

  return "invalid team";
}

function renderMainGame(game) {
  var gameEl = $('<div class="main-game"></div>');
  var titleEl = $('<h1 class="main-title"></h1>');
  var awayTeam = findOpposingTeam(game.awayTeam);
  titleEl.text(team + " vs. " + awayTeam); // change based on how game element is constructed

  var dateEl = $('<p class="main-date"></p>');
  dateEl.text("date: " + game.gameDay);
  var timeEl = $('<p class="main-time"></p>');
  timeEl.text("time: " + game.gameTime);

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

  var mlbScheduleStringify = localStorage.getItem("mlbSchedule");
  if (mlbScheduleStringify) {
    mlbSchedule = JSON.parse(mlbScheduleStringify);
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

$('.dropdown-item').on('click', function () {
  var team  = $(this).text().trim();
  var nextpage = './team-search-page.html#' + team;
  console.log(nextpage);
  location.replace(nextpage);
})

// .saveBtn is name of button for saving specific game. change based on name of button
scheduleEl.on("click", ".saveBtn", saveGamesIntoStorage);
eventdayEl.on("click", ".saveBtn", saveGamesIntoStorage);
