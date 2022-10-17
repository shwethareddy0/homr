// uses ticketmaster api
// can access: game name, game date, ticket url, venue name;
function getNextGameTickets(team) {
    // console.log(mlbTeams[team].city)

    var team = team;
    if (!mlbTeams[team]) {
        console.log("mlbSchedule element 0");
        var key = JSON.parse(localStorage.getItem("mlbSchedule"))[0].homeTeam;
        console.log("team key: " + key);
        team = findOpposingTeam(key);
    }

    var teamQuery = mlbTeams[team].city + team;

    // for (var i = 0; i < mlbTeams.length; i++) {
    //     if (mlbTeams[i].teamName === team) {
    //         teamQuery = mlbTeams[i].city + team
    //     }
    // }
    // if (teamQuery.includes('.')) {
    //     teamQuery = teamQuery.split('.').join('');
    // }
    // teamQuery = teamQuery.split(' ').join('');


    teamQuery = teamQuery.split(' ').join('');
    teamQuery = teamQuery.split('.').join('');
    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + teamQuery + '&size=100&sort=date,asc&apikey=' + tmKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.page.totalElements);

                    // if no tickets are found then just exit the function
                    if (data.page.totalElements === 0) {

                        $('#ticketinfo').text('ticketmaster found no games for: ' + teamQuery);
                        console.log('ticketmaster found no games for: ' + teamQuery);
                        return;
                    }
                    let allEvents = data['_embedded'].events;
                    console.log(allEvents);
                    var gameTickets = []
                    allEvents.forEach(game => {
                        // console.log(game);
                        var ticket = {
                            gameDate: game.dates.start.localDate,
                            gameName: game.name,
                            gameVenue: game._embedded.venues[0].name,
                            ticketUrl: game.url,
                            images: game.images
                        }
                        gameTickets.push(ticket);
                    });
                    // console.log(gameTickets);
                    //if there are game tickets, get the first one
                    if (gameTickets[0]) {
                        renderTicket(gameTickets[0]);
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




function renderTicket(ticket) {
    console.log(ticket);
    console.log(ticket.images);
    console.log(ticket.ticketUrl);
    var ticketBoxEl = $('#ticketinfo');
    var matchNameEl = $('<p>' + ticket.gameName + '</p>');
    var dateEl = $('<p>' + ticket.gameDate + '</p>');
    var venueEl = $('<p>' + ticket.gameVenue + '</p>');
    ticketBoxEl.attr('href', ticket.ticketUrl);
    // ticketBoxEl.href(ticket.ticketUrl);
    ticketBoxEl.css('background', "url(" + ticket.images[3].url + ") no-repeat");
    ticketBoxEl.css('background-position', 'center');
    ticketBoxEl.css('background-size', '100%');
    ticketBoxEl.append(matchNameEl);
    ticketBoxEl.append(dateEl);
    ticketBoxEl.append(venueEl);
    ticketBoxEl.on('click', function () {
        document.location.replace(ticket.ticketUrl);
    });
}


// console.log(document.location.href.split('#')[1])
getNextGameTickets(document.location.href.split('#')[1], 'preseason')

// getNextGameTickets('sanfranciscogiants', 'mlb');


function renderLogo(teamName) {
    var mainDivEl = $('#maindiv');
    if (!mlbTeams[teamName]) {
        console.log('not a team');
        return;
    }
    mainDivEl.css('background', "url(" + mlbTeams[teamName].logo + ") no-repeat");
    mainDivEl.css('background-position', 'center');
    mainDivEl.css('background-size', '100%');
}

renderLogo(document.location.href.split('#')[1]);



// function to get travel time, asks user to get location info for starting latitude longitude
// uses moment.js to acquire travel departure time
// parameters are destination latitude and longitude
function travelTime(teamName) {
    navigator.geolocation.getCurrentPosition(
        position => {

            var end_lat = mlbTeams[teamName].parkLocation[0]
            var end_long = mlbTeams[teamName].parkLocation[1]
            console.log(end_lat + ' ' + end_long);
            apiURL = 'https://api.traveltimeapp.com/v4/time-filter?type=driving&departure_time=' + moment().toISOString() + '&search_lat=' + end_lat + '&search_lng=' + end_long + '&locations=' + position.coords.latitude + '_' + position.coords.longitude + '&app_id=0c93f543&api_key=2535a155d41c0a7803ae5716be3a365a'

            fetch(apiURL)
                .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data.results[0].unreachable.length);
                            if (data.results[0].unreachable.length > 0) {
                                console.log('too far away')
                                renderDistance('unreachable', teamName)
                            } else {
                                var travelTimeSecs = data.results[0].locations[0].properties[0].travel_time;
                                console.log('total travel time: ' + travelTimeSecs/60)
                                renderDistance(travelTimeSecs, teamName)
                            }


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

function renderDistance (travelTimeSeconds, teamName) {
    if(travelTimeSeconds === 'unreachable') {
        $('<p></p>')
    }
    var travelTimeMins = travelTimeSeconds/60;
    console.log('you are: ' + travelTimeMins + ' away from ' + mlbTeams[teamName].parkName)
}

travelTime(document.location.href.split('#')[1]);