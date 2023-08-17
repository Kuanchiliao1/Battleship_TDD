import { Board } from './Board';

function Player(name, totalShips) {
  const board = Board(10, totalShips);

  const attack = (coords, board) => {
    if (coords.length === 0) {
      coords = board.getRandUnhitCoords();
    }

    if (['🌊', '🛥️'].includes(board.getSquareState(coords))) {
      board.receiveAttack(coords);
    } else {
      throw new Error('Can not hit the same target twice!');
    }
  };

  return {
    attack,
    name,
    isCurrentPlayer: false,
    isPlacingShips: false,
    board,
  };
}

export { Player };
