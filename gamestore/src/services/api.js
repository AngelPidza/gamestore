import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchGames = async (category, maxPrice, discountOnly) => {
    const params = {};
    if (category) params.category = category;
    if (maxPrice) params.maxPrice = maxPrice;
    if (discountOnly) params.discountOnly = discountOnly;

    try {
        const response = await API.get('/games', { params });
        console.log('Fetched games:', response.data);
        return response.data; // Retorna los datos de la API.
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error; // Lanza el error para que se maneje más arriba si es necesario.
    }
};
export const fetchGameDetails = async (id) => {
    try {
        const response = await API.get(`/games/${id}`);
        console.log('Fetched game details:', response.data);
        return response.data; // Retorna los detalles del juego.
    } catch (error) {
        console.error(`Error fetching game details for ID ${id}:`, error);
        throw error;
    }
};