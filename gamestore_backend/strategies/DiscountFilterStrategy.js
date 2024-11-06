const GameFilterStrategy = require('./GameFilterStrategy');

class DiscountFilterStrategy extends GameFilterStrategy {
    filter(games) {
        return games.filter(game => game.discount);
    }
}

module.exports = DiscountFilterStrategy;
