const gamesData = require('../data/games.json');
const DiscountDecorator = require('./DiscountDecorator');

class ActionGameFactory {
    getGames() {
        return gamesData
            .filter(game => game.category === 'action')
            .map(game => {
                // Si el juego tiene descuento, aplica el decorador
                if (game.discount) {
                    return new DiscountDecorator(game, game.discount).getDetails();
                }
                return game;
            });
    }
}

module.exports = ActionGameFactory;
