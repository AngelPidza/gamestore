import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { fetchGames } from '../services/api';
import '../style/GameList.css';

const GameList = ({ category, maxPrice, discountOnly }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames(category, maxPrice, discountOnly)
            .then(response => setGames(response.data))
            .catch(error => console.error(error));
    }, [category, maxPrice, discountOnly]);

    return (
        <div className="game-list">
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GameList;
