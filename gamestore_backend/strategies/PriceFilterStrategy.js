const GameFilterStrategy = require('./GameFilterStrategy');

class PriceFilterStrategy extends GameFilterStrategy {
    constructor(maxPrice) {
        super();
        this.maxPrice = maxPrice;
    }

    filter(games) {
        return games.filter(game => game.price <= this.maxPrice);
    }
}

module.exports = PriceFilterStrategy;
