import React from 'react';
import '../style/GameCard.css';

const GameCard = ({ game }) => (
    <div className="game-card">
        <h3>{game.name}</h3>
        <div className="price-info">
            {game.discountedPrice ? (
                <div>
                    <p className="original-price">Original Price: <s>${game.originalPrice}</s></p>
                    <p className="discounted-price">Discounted Price: ${game.discountedPrice}</p>
                    <p className="discount-percentage">-{game.discountPercentage}%</p>
                </div>
            ) : (
                <p className="price">Price: ${game.price}</p>
            )}
        </div>
        <button className="button-details" onClick={() => alert(`Viewing details for ${game.name}`)}>
            View Details
        </button>
    </div>
);

export default GameCard;
