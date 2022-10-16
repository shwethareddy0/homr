//Gets all games of the season
//takes in parameter season year: year of the desired season
//console.log all nba regular season games of that season
var config = {
    nbaKey: '9015b39ae19740d183e333ceb61d0aef',
    tmApi: 'eIRSCBitHabyuXyEKHIK5lpdn1fGWorx',
    mlbKey: '082724269f274dcb8ec595593f5954a6'
}

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
function mlbSchedule(seasonYear) {
    var apiURL = 'https://api.sportsdata.io/v3/mlb/scores/json/Games/' + seasonYear + '?key=' + config.mlbKey;

    console.log(apiURL);
    fetch(apiURL).then(response => {
        if (response.ok) {
            response.json().then(data => {

                var scheduleInfo = []
                data.forEach(game => {
                    if (game.Status === 'Scheduled' || game.Status === 'Postponed') {
                        // console.log(game.DateTime);
                        scheduleInfo.push({
                            gameStatus: game.Status,
                            gameDay: game.DateTime,
                            gameTime: game.DateTime,
                            awayTeam: game.AwayTeam,
                            homeTeam: game.HomeTeam,
                            channel: game.Channel,
                            gameID: game.GameID
                        })
                    }
                })

                // access scheduleInfo here to build dynamic html
                console.log(scheduleInfo);
                localStorage.setItem('mlbSchedule', JSON.stringify(scheduleInfo));
            })
        }
    })
        .catch(error => {
            console.log('unable to connect to api link')
        })
}

mlbSchedule('2023');


//api function call to get the standings for the year
async function nbaGetStandings() {

    var apiURL = 'https://api.sportsdata.io/v3/mlb/scores/json/Standings/2022?key=ae5378a25a0f4bafb84e143f07a44618';


    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var gamewinS = [];
                    var gamelosses = [];
                    for (i = 0; i <= data.length; i++) {
                        //home+away=total
                        console.log(data[i].AwayWins);
                        console.log(data[i].HomeWins);
                        console.log(data[i].AwayLosses);
                        console.log(data[i].HomeLosses);
                        var totalwins = data[i].AwayWins + data[i].HomeWins;
                        var totalLoss = data[i].AwayLosses + data[i].HomeLosses;
                        console.log(totalwins);
                        console.log(totalLoss);

                    }

                });
            } else {
                console.log('error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('unable to connect to api link');
        });

}



// mlbGetLastGameScore('mlb', 2021, 'giants')

// function to get travel time, asks user to get location info for starting latitude longitude
// uses moment.js to acquire travel departure time
// parameters are destination latitude and longitude
function travelTime(end_lat, end_long) {
    navigator.geolocation.getCurrentPosition(
        position => {


            apiURL = 'https://api.traveltimeapp.com/v4/time-filter?type=driving&departure_time=' + moment().toISOString() + '&search_lat=' + end_lat + '&search_lng=' + end_long + '&locations=' + position.coords.latitude + '_' + position.coords.longitude + '&app_id=0c93f543&api_key=2535a155d41c0a7803ae5716be3a365a'

            fetch(apiURL)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(data => {
                            var travelTimeSecs = data.results[0].locations[0].properties[0].travel_time;
                            console.log('total travel time: ' + travelTimeSecs)

                        });
                    } else {
                        console.log('error: ' + response.statusText);
                    }
                })
                .catch(function (error) {
                    console.log('unable to connect to api link');
                });

        })
}

// travelTime(37.7749, -122.4194);