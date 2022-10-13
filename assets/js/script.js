//Gets all games of the season
var nbaApiKey = config.nbaKey;
async function getAllGames(seasonYear) {

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

//Gets all games for the home team
async function getHomeGames(seasonYear, homeTeam) {

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


async function getLastGameScore(seasonYear, teamName) {

    var apiURL = 'https://api.sportsdata.io/v3/nba/scores/json/Games/' + seasonYear + '?key=' + nbaApiKey;


    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //todo: get last played game score
                    data.forEach(game => {
                        if(game.HomeTeam === teamName) {
                            console.log(game);
                        }
                        
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

function getTicketMaster() {

}

// getLastGameScore(2022, 'GS')

// var gameInfo = await getNextHomeGameDate(2023, 'GS');
// // getNextHomeGame(2023, 'GS');
// console.log(gameInfo);
