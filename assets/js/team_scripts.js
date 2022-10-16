// uses ticketmaster api
// can access: game name, game date, ticket url, venue name;
function getNextGameTickets(team, league) {

    var teamQuery = team;
    for (var i = 0; i < mlbTeams.length; i++) {
        if (mlbTeams[i].teamName === team) {
            teamQuery = mlbTeams[i].city + team
        }
    }
    if(teamQuery.includes('.')) {
        teamQuery = teamQuery.split('.').join('');
    }
    teamQuery = teamQuery.split(' ').join('');
    console.log(teamQuery);
    var apiURL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + teamQuery + '&size=100&sort=date,asc&apikey=' + tmKey;

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.page.totalElements);
                    if(data.page.totalElements === 0) {
                        $('#ticketinfo').text('ticketmaster found no games for: ' + teamQuery);
                        console.log('ticketmaster found no games for: ' + teamQuery);
                        return;
                    }
                    let allEvents = data['_embedded'].events;
                    console.log(allEvents);
                    var gameTickets = []
                    allEvents.forEach(game => {
                        if (game.promoter) {
                            let gamePromoters = game.promoter.name.split(' ');
                            // console.log(gamePromoters)
                            
                            if (gamePromoters.includes(league.toUpperCase())) {
                                console.log(game);
                                var ticket = {
                                    gameDate: game.dates.start.localDate,
                                    gameName: game.name,
                                    gameVenue: game._embedded.venues[0].name,
                                    ticketUrl: game.url,
                                    images: game.images
                                }
                                gameTickets.push(ticket);

                            }

                        }
                    });
                    // console.log(gameTickets);
                    //if there are game tickets, get the first one
                    if(gameTickets[0]) {
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



// getNextGameTickets('sanfranciscogiants', 'mlb');

function renderTicket(ticket) {
    console.log(ticket);
    console.log(ticket.images);
    console.log(ticket.ticketUrl);
    var ticketBoxEl = $('#ticketinfo');
    var matchNameEl = $('<p>'+ticket.gameName+'</p>');
    var dateEl = $('<p>'+ticket.gameDate+'</p>');
    var venueEl = $('<p>'+ticket.gameVenue+'</p>');
    ticketBoxEl.attr('href', ticket.ticketUrl);
    // ticketBoxEl.href(ticket.ticketUrl);
    ticketBoxEl.css('background-image', "url("+ticket.images[3].url+")");
    ticketBoxEl.css('background-position', 'center');
    ticketBoxEl.append(matchNameEl);
    ticketBoxEl.append(dateEl);
    ticketBoxEl.append(venueEl);
    ticketBoxEl.on('click', function() {
        document.location.replace(ticket.ticketUrl);
    });
}


console.log(document.location.href.split('#')[1])
getNextGameTickets(document.location.href.split('#')[1], 'mlb')