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

function getTicketMaster(sport) {

    // var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+sport+'&sort=date,asc&apikey=' + tmKey;
    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?promoterId='+sport+'&sort=date,asc&apikey=' + tmKey;
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

// function to get ticketmaster url link to the next game of a specific team;
// TODO: do more filtering to get the following results:
// game date, teams involved, url to ticketmaster
function getTicketMaster(sport, teamName) {

    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+sport+'&sort=date,asc&apikey=' + tmKey;
    // var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?promoterId='+sport+'&sort=date,asc&apikey=' + tmKey;
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //todo: get last played game score
                    var games = data['_embedded'].events;
                    // console.log(data['_embedded'].events);
                    // var eventDates = [];
                    games.forEach(game => {
                        // if the game promoter exists
                        if(game.promoter) {
                            var promoters = game.promoter.name.split(' ');
                            // console.log(game.promoter.name.split(' '))
                            if(promoters.includes(sport.toUpperCase())) {
                                console.log(game.name.toUpperCase().split()); 
                                // console.log(game.dates)
                                // if(game.name.toUpperCase().split().includes(teamName.toUpperCase())) {
                                //     console.log(game.name)
                                // }
                            }
                        }
                        
                        // if(game.promoter) {
                        //     // console.log(game.promoter.name.split(' '));
                        //     console.log(game.promoter['name'])
                        //     // if(game.promoter.name.split(' ').includes(sport.toUpperCase())) {
                        //     //     if (game.prmoter.name) {
                        //     //         console.log(game.promoter.name)
                        //     //     }
                        //     // }
                        // }
                        // console.log(game.promoter)
                        // if (game.promoter['name'].split(' ').includes(sport.toUpperCase())) {
                        //     console.log(game.promoter)
                        //     // console.log(game.promoter['name'])
                        // }
                        // console.log(game.promoter);
                        // console.log(game['url']);
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


//
// uses ticketmaster api
// can access: game name, game date, ticket url, venue name;
async function getNextGameTickets(team, league) {

    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+team+'&sort=date,asc&apikey=' + tmKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let allEvents = data['_embedded'].events;
                    console.log(allEvents);
                    allEvents.forEach(game => {
                        if(game.promoter) {
                            let gamePromoters = game.promoter.name.split(' ');
                            // console.log(gamePromoters)
                            
                            if(gamePromoters.includes(league.toUpperCase())) {
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


getNextGameTickets('dodgers', 'mlb')

