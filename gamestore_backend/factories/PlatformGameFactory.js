const gamesData = require('../data/games.json');
const DiscountDecorator = require('./DiscountDecorator');

class PlatformGameFactory {
    getGames() {
        return gamesData
            .filter(game => game.category === 'platform')
            .map(game => {
                // Si el juego tiene descuento, aplica el decorador
                if (game.discount) {
                    return new DiscountDecorator(game, game.discount).getDetails();
                }
                return game;
            });
    }
}

module.exports = PlatformGameFactory;
