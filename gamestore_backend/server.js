// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const apikey = '50d0e4bb9d0b4c1383c9201b658a4fbe';
// Estrategias de filtrado
const CategoryFilterStrategy = require('./strategies/CategoryFilterStrategy');
const PriceFilterStrategy = require('./strategies/PriceFilterStrategy');
const DiscountFilterStrategy = require('./strategies/DiscountFilterStrategy');

const app = express();
app.use(cors());

// Limitar el número de solicitudes simultáneas
const fetchGameDetails = async (gameId) => {
    try {
        const gameResponse = await axios.get(
            `https://api.rawg.io/api/games/${gameId}?key=${apikey}`
        );
        return gameResponse.data.description_raw || 'No description available';
    } catch (error) {
        console.error(`Error fetching details for game ${gameId}:`, error);
        return 'No description available'; // En caso de error, devolver un mensaje por defecto
    }
};


// Transformar los datos básicos y agregar la descripción
const transformApiDataWithDescriptions = async (apiGames) => {
    const games = await Promise.allSettled(
        apiGames.map(async (game) => {
            const description_raw = await fetchGameDetails(game.id);
            return {
                id: game.id,
                name: game.name,
                imageUrl: game.background_image,
                rating: game.rating,
                price: game.metacritic ? (game.metacritic/2).toFixed(2) : 59.99,
                genres: game.genres ? game.genres.map(g => g.name) : [],
                playtime: game.playtime,
                discount: game.rating > 4 ? null : (Math.floor((4 - game.rating) * 10)).toFixed(2),
                description: description_raw,
            };
        })
    );
    return games.filter(result => result.status === 'fulfilled').map(result => result.value);
};

app.get('/games', async (req, res) => {
    try {
        let { category, maxPrice, discountOnly } = req.query;
        
        // Modificamos la función para obtener todos los juegos necesarios
        async function fetchAllGames(pageSize = 100) {
            let allGames = [];
            const timestamp = new Date().getTime();
            
            // Hacemos la primera llamada para obtener el total de páginas
            const firstResponse = await axios.get(
                `https://api.rawg.io/api/games?key=${apikey}&page_size=${pageSize}&_=${timestamp}`
            );
            
            // Agregamos los resultados de la primera página
            allGames = [...firstResponse.data.results];
            
            // Si necesitamos más páginas, las solicitamos
            if (firstResponse.data.next) {
                const page2Response = await axios.get(
                    `${firstResponse.data.next}&_=${timestamp}`
                );
                allGames = [...allGames, ...page2Response.data.results];
            }
            
            return allGames;
        }

        // Obtener datos básicos de la API
        const apiGames = await fetchAllGames();
        
        // Agregar descripciones
        const games = await transformApiDataWithDescriptions(apiGames);

        console.log('Fetched games count:', games.length);

        // Aplicar filtros
        let filteredGames = games;

        if (category) {
            const categoryFilter = new CategoryFilterStrategy(category);
            filteredGames = categoryFilter.filter(filteredGames);
        }

        if (maxPrice) {
            const priceFilter = new PriceFilterStrategy(parseFloat(maxPrice));
            filteredGames = priceFilter.filter(filteredGames);
        }

        if (discountOnly === "true") {
            const discountFilter = new DiscountFilterStrategy();
            filteredGames = discountFilter.filter(filteredGames);
        }

        res.json(filteredGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching games data' });
    }
});

app.get('/games/:id', async (req, res) => {
    try {
        // Obtener los detalles del juego
        const gameResponse = await axios.get(
            `https://api.rawg.io/api/games/${req.params.id}?key=${apikey}`
        );
        
        // Obtener las capturas de pantalla del juego
        const screenshotsResponse = await axios.get(
            `https://api.rawg.io/api/games/${req.params.id}/screenshots?key=${apikey}`
        );

        const gameDetails = {
            id: gameResponse.data.id,
            slug: gameResponse.data.slug,
            name: gameResponse.data.name,
            description: gameResponse.data.description,
            nameOriginal: gameResponse.data.name_original,
            released: gameResponse.data.released,
            updated: gameResponse.data.updated,
            backgroundImage: gameResponse.data.background_image,
            backgroundImageAdditional: gameResponse.data.background_image_additional,
            website: gameResponse.data.website,
            rating: gameResponse.data.rating,
            ratingTop: gameResponse.data.rating_top,
            ratings: gameResponse.data.ratings.map(rating => ({
                id: rating.id,
                title: rating.title,
                count: rating.count,
                percent: rating.percent
            })),
            metacritic: gameResponse.data.metacritic,
            metacriticPlatforms: gameResponse.data.metacritic_platforms?.map(platform => ({
                metascore: platform.metascore,
                url: platform.url,
                platform: platform.platform.name
            })),
            playtime: gameResponse.data.playtime,
            platforms: gameResponse.data.platforms?.map(p => ({
                platform: p.platform.name,
                released: p.released_at,
                requirements: p.requirements_en
            })),
            parentPlatforms: gameResponse.data.parent_platforms?.map(p => p.platform.name),
            genres: gameResponse.data.genres?.map(g => ({
                id: g.id,
                name: g.name,
                slug: g.slug
            })),
            stores: gameResponse.data.stores?.map(s => ({
                id: s.id,
                url: s.url,
                store: s.store.name
            })),
            developers: gameResponse.data.developers?.map(d => ({
                id: d.id,
                name: d.name,
                slug: d.slug
            })),
            publishers: gameResponse.data.publishers?.map(p => ({
                id: p.id,
                name: p.name,
                slug: p.slug
            })),
            esrbRating: gameResponse.data.esrb_rating ? {
                id: gameResponse.data.esrb_rating.id,
                name: gameResponse.data.esrb_rating.name,
                slug: gameResponse.data.esrb_rating.slug
            } : null,
            tags: gameResponse.data.tags?.map(t => ({
                id: t.id,
                name: t.name,
                slug: t.slug,
                language: t.language,
                gamesCount: t.games_count
            })),
            screenshots: screenshotsResponse.data.results?.map(screenshot => ({
                id: screenshot.id,
                image: screenshot.image
            })) || [],
            shortScreenshots: gameResponse.data.short_screenshots?.map(screenshot => ({
                id: screenshot.id,
                image: screenshot.image
            })) || [],
            added: gameResponse.data.added,
            addedByStatus: gameResponse.data.added_by_status,
            redditUrl: gameResponse.data.reddit_url,
            redditCount: gameResponse.data.reddit_count,
            twitchCount: gameResponse.data.twitch_count,
            youtubeCount: gameResponse.data.youtube_count,
            reviewsCount: gameResponse.data.reviews_count,
            price: gameResponse.data.metacritic ? (Math.max(9.99, gameResponse.data.metacritic * 0.6)).toFixed(2) : 59.99,
            discount: gameResponse.data.rating 
                ? gameResponse.data.rating < 4 
                    ? Math.floor((4 - gameResponse.data.rating) * 15) 
                    : null 
                : null,
            alternativeNames: gameResponse.data.alternative_names || []
        };

        res.json(gameDetails);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Game not found' });
        } else {
            console.error('Error fetching game details:', error);
            res.status(500).json({ error: 'Error fetching game details' });
        }
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});