const express = require('express');
const cors = require('cors');
const gamesData = require('./data/games.json');

// Estrategias de filtrado
const CategoryFilterStrategy = require('./strategies/CategoryFilterStrategy');
const PriceFilterStrategy = require('./strategies/PriceFilterStrategy');
const DiscountFilterStrategy = require('./strategies/DiscountFilterStrategy');

const app = express();
app.use(cors());

app.get('/games', (req, res) => {
    let { category, maxPrice, discountOnly } = req.query;
    let games = gamesData;

    if (category) {
        const categoryFilter = new CategoryFilterStrategy(category);
        games = categoryFilter.filter(games);
    }

    if (maxPrice) {
        const priceFilter = new PriceFilterStrategy(parseFloat(maxPrice));
        games = priceFilter.filter(games);
    }

    if (discountOnly === "true") {
        const discountFilter = new DiscountFilterStrategy();
        games = discountFilter.filter(games);
    }

    res.json(games);
});

app.listen(5000, () => console.log('Backend ejecutándose en http://localhost:5000'));
