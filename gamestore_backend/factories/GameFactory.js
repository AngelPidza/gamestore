const ActionGameFactory = require('./ActionGameFactory');
const PuzzleGameFactory = require('./PuzzleGameFactory');
const PlatformGameFactory = require('./PlatformGameFactory');

const GameFactory = {
    createFactory: (category) => {
        switch (category) {
            case 'action': return new ActionGameFactory();
            case 'puzzle': return new PuzzleGameFactory();
            case 'platform': return new PlatformGameFactory();
            default: return null;
        }
    }
};

module.exports = GameFactory;
