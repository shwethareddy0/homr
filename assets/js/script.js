var savedGames = [];
var gamesEl = $('#games'); // Change depending on name of section with upcoming games

function loadGamesIntoStorage() {
     
}

// .saveBtn is name of button for saving specific game. change based on name of button
gamesEl.on('click', '.saveBtn', loadGamesIntoStorage);