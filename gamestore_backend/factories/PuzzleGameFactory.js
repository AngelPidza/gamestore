const gamesData = require('../data/games.json');
const DiscountDecorator = require('./DiscountDecorator');

class PuzzleGameFactory {
    getGames() {
        return gamesData
            .filter(game => game.category === 'puzzle')
            .map(game => {
                // Si el juego tiene descuento, aplica el decorador
                if (game.discount) {
                    return new DiscountDecorator(game, game.discount).getDetails();
                }
                return game;
            });
    }
}

module.exports = PuzzleGameFactory;
