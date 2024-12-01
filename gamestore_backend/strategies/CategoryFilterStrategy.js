const GameFilterStrategy = require('./GameFilterStrategy');

class CategoryFilterStrategy extends GameFilterStrategy {
    constructor(category) {
        super();
        this.category = category.toLowerCase();
    }

    filter(games) {
        return games.filter(game => 
            game.category.toLowerCase() === this.category
        );
    }
}


module.exports = CategoryFilterStrategy;
