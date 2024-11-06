class DiscountDecorator {
    constructor(game, discountPercentage) {
        this.game = game;
        this.discountPercentage = discountPercentage;
    }

    getDetails() {
        const discountAmount = this.game.price * (this.discountPercentage / 100);
        const discountedPrice = this.game.price - discountAmount;
        return {
            ...this.game,
            originalPrice: this.game.price,
            discountedPrice: parseFloat(discountedPrice.toFixed(2)),
            discountPercentage: this.discountPercentage,
        };
    }
}

module.exports = DiscountDecorator;
