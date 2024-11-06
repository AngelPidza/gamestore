import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchGames = (category, maxPrice, discountOnly) => {
    const params = {};
    if (category) params.category = category;
    if (maxPrice) params.maxPrice = maxPrice;
    if (discountOnly) params.discountOnly = discountOnly;

    return API.get('/games', { params });
};