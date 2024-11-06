const GameFilterStrategy = require('./GameFilterStrategy');

class CategoryFilterStrategy extends GameFilterStrategy {
    constructor(category) {
        super();
        this.category = category;
    }

    filter(games) {
        return games.filter(game => game.category === this.category);
    }
}

module.exports = CategoryFilterStrategy;
