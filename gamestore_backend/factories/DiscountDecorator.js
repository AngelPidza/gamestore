class DiscountDecorator {
    constructor(game) {
        this.game = game;
    }

    getPrice() {
        if (this.game.discount) {
            return this.game.price * (1 - this.game.discount / 100);
        }
        return this.game.price;
    }

    getDetails() {
        const baseDetails = {
            ...this.game,
            finalPrice: this.getPrice()
        };

        if (this.game.discount) {
            baseDetails.discountApplied = true;
            baseDetails.originalPrice = this.game.price;
            baseDetails.savings = this.game.price - this.getPrice();
        }

        return baseDetails;
    }
}

module.exports = DiscountDecorator;
