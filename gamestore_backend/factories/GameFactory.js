const ActionGameFactory = require('./ActionGameFactory');
const PuzzleGameFactory = require('./PuzzleGameFactory');
const PlatformGameFactory = require('./PlatformGameFactory');

class GameFactory {
    createGame(gameData) {
        // Crear juego base
        const game = {
            id: gameData.id,
            name: gameData.name,
            category: gameData.genres[0]?.name.toLowerCase() || 'uncategorized',
            price: gameData.metacritic || 59.99,
            rating: gameData.rating
        };

        // Aplicar descuento basado en rating
        if (game.rating < 4) {
            game.discount = Math.floor((4 - game.rating) * 10);
        }

        return game;
    }
}


module.exports = GameFactory;
