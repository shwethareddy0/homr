//Used for chart generation
var seasonyear = new Date().getFullYear();
var gamewins = [];
var gamelosses = [];
var cities = [];
var mlbSchedule = []; // Temporary test variable for upcoming games

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

//navbar-dropdown collapse on page load
$(".navbar-item.has-dropdown").children().children().toggle();

//navbar-dropdown display navbar-items on click
$(".navbar-item.has-dropdown").click(function () {
  $(this).children().children().toggle();
});

mlbGetStandings();

async function mlbGetStandings() {
  var apiURL =
    "https://api.sportsdata.io/v3/mlb/scores/json/Standings/" +
    seasonyear +
    "?key=ae5378a25a0f4bafb84e143f07a44618";

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      gamewins = [];
      gamelosses = [];
      for (i = 0; i < data.length; i++) {
        //home+away=total

        var totalwins = data[i].AwayWins + data[i].HomeWins;
        var totalLoss = data[i].AwayLosses + data[i].HomeLosses;
        var city = data[i].Name;

        gamewins.push(totalwins);
        gamelosses.push(totalLoss);
        cities.push(city);
        //console.log(totalwins);
        //console.log(totalLoss);
      }
    })
    .then(function () {
      // if no chart is found in the page;
      if (!document.getElementById("chart")) {
        return;
      }
      var ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: cities,
          datasets: [
            {
              label: "Total Wins by Team",
              data: gamewins,
              backgroundColor: "rgb(75, 192, 192)",
            },
          ],
        },
      });
      var tx = document.getElementById("chartloss").getContext("2d");
      new Chart(tx, {
        type: "bar",
        data: {
          labels: cities,
          datasets: [
            {
              label: "Total Losses by Team",
              data: gamelosses,
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        },
      });
    });
}

function renderGames() {
  team = document.location.href.split("#")[1];
  if (
    team === "upcoming-games" ||
    team === "ticketinfo" ||
    team === "travelinfo"
  ) {
    renderAllGames();
    return;
  } else if (!team) {
    console.log("no team");
    return;
  }

  teamEl.text(team);
  if (mlbSchedule.length === 0) {
    scheduleHeaderEl.text("No upcoming games.");

    var titleEl = $('<h3 class="game-title"></h3>');
    titleEl.text(team + " have no games");
    eventdayEl.append(titleEl);

    return;
  }

  // var teamKey = findTeamCode(team);
  console.log(mlbTeams[team]);
  var teamKey = mlbTeams[team]["teamKey"];
  console.log(team + "'s key: " + teamKey);

  var currTeamGames = [];

  for (var i = 0; i < mlbSchedule.length; i++) {
    if (teamKey === mlbSchedule[i].homeTeam) {
      currTeamGames.push(mlbSchedule[i]);
      renderGame(mlbSchedule[i], "Home");
    } else if (teamKey === mlbSchedule[i].awayTeam) {
      currTeamGames.push(mlbSchedule[i]);
      renderGame(mlbSchedule[i], "Away");
    }
  }

  if (currTeamGames.length !== 0) {
    renderEventSection(currTeamGames[0]);
  }
}

function renderAllGames() {
  teamEl.text("This Season's Games");

  renderEventSection(mlbSchedule[0]);

  if (mlbSchedule.length === 0) {
    scheduleHeaderEl.text("No upcoming games.");

    var titleEl = $('<h3 class="game-title"></h3>');
    titleEl.text("Season is over");
    eventdayEl.append(titleEl);

    return;
  }

  for (var i = 0; i < mlbSchedule.length; i++) {
    if (i > 5) {
      return;
    }
    renderGame(mlbSchedule[i], "All");

    // we only want to show the next 5 games:
  }
}

function renderGame(game, homeAway) {
  var gameEl = $('<div class="game"></div>');
  var titleEl = $('<h3 class="game-title"></h3>');
  var homeAwayEl = $('<p class="game-awayHome"></p>');
  var opposingTeam = "";
  if (homeAway === "Home") {
    opposingTeam = findOpposingTeam(game.awayTeam);
    titleEl.text(team + " vs. " + opposingTeam);
    homeAwayEl.text("Away or Home game? " + homeAway);
  } else if (homeAway === "Away") {
    opposingTeam = findOpposingTeam(game.homeTeam);
    titleEl.text(opposingTeam + " vs. " + team);
  } else {
    var homeTeam = findOpposingTeam(game.homeTeam);
    var awayTeam = findOpposingTeam(game.awayTeam);
    titleEl.text(homeTeam + " vs. " + awayTeam);
  }

  var gameStatusEl = $('<p class="game-status"></p>');
  gameStatusEl.text("Game status: " + game.gameStatus);

  // NO DATA FOR DATE AND TIME
  // var dateEl = $('<p class="date"></p>');
  // dateEl.text("date: " + game.gameDay);
  // var timeEl = $('<p class="time"></p>');
  // timeEl.text("time: " + game.gameTime);

  // var saveBtnEl = $(
  //   '<button class="saveBtn button is-success is-outlined">Save</button>'
  // );

  gameEl.append(titleEl);
  // gameEl.append(dateEl);
  // gameEl.append(timeEl);
  if (homeAway !== "All") {
    gameEl.append(homeAwayEl);
  }
  gameEl.append(gameStatusEl);
  // gameEl.append(saveBtnEl);
  $("#upcoming-games").append(gameEl);
}

function findOpposingTeam(opposingTeam) {
  var keys = Object.keys(mlbTeams);
  for (var i = 0; i < keys.length; i++) {
    if (mlbTeams[keys[i]].teamKey === opposingTeam) {
      return keys[i];
    }
  }
  return "invalid team";
}

function findTeamCode(team) {
  mlbTeams.forEach((team) => {
    if (team.teamName === team) {
      return;
    }
  });
  // if (mlbTeams[team].teamKey) {
  //   return mlbTeams[team].teamKey
  // }
  return "invalid team";
}

function renderEventSection(game) {
  var gameEl = $('<div class="game"></div>');
  var titleEl = $('<h3 class="game-title"></h3>');
  var homeTeam = findOpposingTeam(game.homeTeam);
  var awayTeam = findOpposingTeam(game.awayTeam);
  titleEl.text(homeTeam + " vs. " + awayTeam);

  var gameStatusEl = $('<p class="game-status"></p>');
  gameStatusEl.text("Game status: " + game.gameStatus);

  // var dateEl = $('<p class="main-date"></p>');
  // dateEl.text("date: " + game.gameDay);
  // var timeEl = $('<p class="main-time"></p>');
  // timeEl.text("time: " + game.gameTime);

  /*var saveBtnEl = $(
    '<button class="saveBtn button is-success is-outlined">Save</button>'
  );*/

  gameEl.append(titleEl);
  // gameEl.append(dateEl);
  // gameEl.append(timeEl);
  gameEl.append(gameStatusEl);
  // gameEl.append(saveBtnEl);
  eventdayEl.append(gameEl);

  // if (savedGames.length !== 0) {
  //   renderSavedGames();
  // }
}

function renderSavedGames() {
  var headerEl = $("<h3>Saved Games:</h3>");
  eventdayEl.append($("<br/>"));
  eventdayEl.append($("<br/>"));
  eventdayEl.append(headerEl);

  for (var i = 0; i < savedGames.length; i++) {}
}

// Load tickets:
// var priceEl = $('<p class="tickets"></p>');
// priceEl.text("ticket price: " + game.price);
// var buyTicketsEl = $('<a class="buy"></a>');
// buyTicketsEl.attr("src", game.buy);
// buyTicketsEl.text("Buy Tickets Now!");

function loadGamesFromStorage() {
  var savedGamesStringify = localStorage.getItem("savedGames");
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
  for (var i = 0; i < gameChildrenEl.length; i++) {
    var className = gameChildrenEl.eq(i).attr("class");
    if (className === "game-title") {
      game["title"] = gameChildrenEl.eq(i).text();
    } else if (className === "game-status") {
      game["status"] = gameChildrenEl.eq(i).text();
    }
  }
  console.log("saved games");
  console.log(savedGames);
  console.log("game title");
  console.log(game.title);

  for (var j = 0; j < savedGames.length; i++) {
    if (savedGames[j].title === game.title) {
      return;
    }
  }

  savedGames.push(game);
  localStorage.setItem("savedGames", JSON.stringify(savedGames));
}

$(".dropdown-item").on("click", function () {
  var team = $(this).text().trim();
  var nextpage = "./team-search-page.html#" + team;
  console.log(nextpage);
  location.replace(nextpage);
});

loadGamesFromStorage();
renderGames();

// .saveBtn is name of button for saving specific game. change based on name of button
// $(".saveBtn").on("click", saveGamesIntoStorage);
