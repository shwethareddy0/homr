//Gets all games of the season
//takes in parameter season year: year of the desired season
//console.log all nba regular season games of that season
var nbaApiKey = config.nbaKey;
async function nbaGetSeasonGames(seasonYear) {

    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;


    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });

}

//Gets all home games for a given team
async function nbaGetHomeGames(seasonYear, homeTeam) {

    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    var homeGames = [];
                    data.forEach(game => {
                        if (game.HomeTeam === homeTeam) {
                            // console.log(game);
                            homeGames.push(game);
                        }
                    }
                    );
                    console.log(homeGames)
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}

var tmKey = config.tmApi
async function getTickets() {

    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=warriors&city=phoenix&apikey=' + tmKey;
    // https://app.ticketmaster.com/discovery/v2/events.json?apikey={apikey}

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('getting tickets')
                    console.log(data);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}

async function getEventforVenue(venueID) {

    var apiURL = 'https://app.ticketmaster.com/discovery/v2/venues.json?keyword=chase&apikey=' + tmKey;
    // https://app.ticketmaster.com/discovery/v2/events.json?apikey={apikey}
    // var apiURL = 'https://app.ticketmaster.com/discovery/v2/venues/'+ venueID +'.json?keyword=chase&apikey=' + tmKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('getting tickets')
                    console.log(data);
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}



// getHomeGames(2023, 'GS');
// getTickets();
// getEventforVenue('KovZ917Ah1H');


var testHomegames = []
async function getNextHomeGameDate(seasonYear, homeTeam) {

    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var arr = [];
                    data.forEach(game => {
                        if (game.HomeTeam === homeTeam) {
                            if (game.Status === 'Scheduled') {
                                // console.log(game.Day);
                                arr.push(game.Day);
                            }
                        }
                    }


                    );
                    console.log(arr);
                    return arr;

                });
            } else {
                console.error('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.error('unable to connect to api link');
        });
}

async function uberApi(seasonYear, homeTeam) {

    https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075
    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;


    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var arr = [];
                    data.forEach(game => {
                        if (game.HomeTeam === homeTeam) {
                            if (game.Status === 'Scheduled') {
                                // console.log(game.Day);
                                arr.push(game.Day);
                            }
                        }
                    }


                    );
                    console.log(arr);
                    return arr;

                });
            } else {
                console.error('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.error('unable to connect to api link');
        });
}


function getTicketMaster(sport) {

    // var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+sport+'&sort=date,asc&apikey=' + tmKey;
    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?promoterId=' + sport + '&sort=date,asc&apikey=' + tmKey;
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //todo: get last played game score
                    var games = data['_embedded'].events;
                    // console.log(data['_embedded'].events);
                    // var eventDates = [];
                    games.forEach(game => {
                        console.log(game);
                        console.log(game['url']);
                    });

                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}


// uses ticketmaster api
// can access: game name, game date, ticket url, venue name;
async function getNextGameTickets(team, league) {

    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + team + '&sort=date,asc&apikey=' + tmKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let allEvents = data['_embedded'].events;
                    console.log(allEvents);
                    allEvents.forEach(game => {
                        if (game.promoter) {
                            let gamePromoters = game.promoter.name.split(' ');
                            // console.log(gamePromoters)

                            if (gamePromoters.includes(league.toUpperCase())) {
                                let gameDate = game.dates.start.localDate;
                                let gameName = game.name;
                                let gameVenue = game._embedded.venues[0].name;
                                let ticketUrl = game.url

                                console.log(gameDate);
                                console.log(gameName);
                                console.log(gameVenue);
                                console.log(ticketUrl);

                            }

                        }
                    });
                    // console.log()
                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}


// getNextGameTickets('dodgers', 'mlb')

//function to get the last game score of a certain team
// parameters are: league name, year of the season, name of team
async function mlbLastGameScore(seasonYear, teamName) {

    // var apiURL = 'https://api.sportsdata.io/v3/' + league + '/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;
    // https://api.sportsdata.io/v3/mlb/scores/json/teams
    // https://api.sportsdata.io/v3/mlb/scores/json/TeamGameStatsBySeason/{season}/{teamid}/{numberofgames}
    // https://api.sportsdata.io/v3/mlb/scores/json/TeamGameStatsBySeason/2021/2/all?key=082724269f274dcb8ec595593f5954a6
    var teamID;
    // let nbaTeams = nbaTeams;
    mlbTeams.forEach(team => {
        // console.log(team.teamName)
        // console.log(team.teamID)
        if (teamName === team.teamName) {
            // console.log(team.teamName)
            teamID = team.teamID;
        }
    });
    // console.log(teamID);
    var apiURL = 'https://api.sportsdata.io/v3/mlb/scores/json/TeamGameStatsBySeason/' + seasonYear + '/' + teamID + '/all?key=' + config.mlbKey;


    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //todo: get last played game score
                    console.log(data)
                    console.log(data[0].Day)


                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });
}

// mlbLastGameScore(2022, 'Giants')


// gets list of mlb teams by id
async function nbaGetTeamIds(teamName) {
    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/teams?key=' + config.nbaKey;
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //todo: get last played game score
                    var teamInfoData = [];
                    data.forEach(team => {
                        teamInfoData.push({
                            teamID: team.TeamID,
                            city: team.City,
                            teamName: team.Name,
                            teamKey: team.Key
                        })
                        // console.log(team);
                    });

                    console.log(teamInfoData);
                    return teamInfoData;


                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });

}

// a function to get all scheduled mlb games
// takes info from all game data:
// gameDay, gameTime, awayTeam, homeTeam, channel, gameID
// parameters: seasonyear along with time of season
// ex 2022 for the regular season
// 2022POST for 2022 playoffs
// 2022PRE for preseason
// can store information in local storage
async function mlbSchedule(seasonYear) {
    var aprURL = 'https://api.sportsdata.io/v3/mlb/scores/json/Games/' + seasonYear + '?key=' + config.mlbKey;

    fetch(aprURL).then(response => {
        if (response.ok) {
            return response.json();
        }
    })
        .then(data => {
            //game necessary info from response 
            var scheduleInfo = []
            data.forEach(game => {
                if (game.Status === 'Scheduled' || game.Status === 'Postponed') {
                    scheduleInfo.push({
                         gameDay: game.DateTime.split('T')[0],
                         gameTime: game.DateTime.split('T')[1],
                         awayTeam: game.AwayTeam,
                         homeTeam: game.HomeTeamk,
                         channel: game.Channel,
                         gameID: game.GameID
                    })
                }
            })

            // access scheduleInfo here to build dynamic html
            console.log(scheduleInfo);
            localStorage.setItem('mlbSchedule', JSON.stringify(scheduleInfo));
        })
        .catch(error => {
            console.log('unable to connect to api link')
        })
}

mlbSchedule('2022POST')


// mlbGetLastGameScore('mlb', 2021, 'giants')

