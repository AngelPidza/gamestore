import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { fetchGames } from '../services/api';
import '../style/GameList.css';

const GameList = ({ category, maxPrice, discountOnly }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const fetchedGames = await fetchGames();
                const filteredGames = fetchedGames.filter(game => {
                    if (category && game.category !== category) return false;
                    if (maxPrice && game.price > parseFloat(maxPrice)) return false;
                    if (discountOnly && !game.discountedPrice) return false;
                    return true;
                });
                setGames(filteredGames);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los juegos');
            } finally {
                setLoading(false);
            }
        };
        loadGames();
    }, [category, maxPrice, discountOnly]);

    if (loading) return <div className="loading">Cargando juegos...</div>;
    if (error) return <div className="error">{error}</div>;
    if (games.length === 0) return <div className="no-games">No se encontraron juegos</div>;

    return (
        <div className="game-list-container">
            <div className="game-list-grid">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default GameList;
