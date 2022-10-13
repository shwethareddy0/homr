var savedGames = [];
var gamesEl = $('#games'); // Change depending on name of section with upcoming games

function loadGamesIntoStorage() {
    var game = $(this).parent(); // Change based on how game element is made
    savedGames.push(game);
    localStorage.setItem('saved games', JSON.stringify(savedGames));
}

// .saveBtn is name of button for saving specific game. change based on name of button
gamesEl.on('click', '.saveBtn', loadGamesIntoStorage);