import { isPlainObject } from 'lodash';
import { Board } from './Board';

function Player(name, totalShips) {
  const board = Board(10, totalShips);
  let isCurrentPlayer = false;
  let isPlacingShips = false;

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

  function setPlayerActive() {
    this.isCurrentPlayer = true;
    this.isPlacingShips = true;
  };

  return {
    attack,
    name,
    isCurrentPlayer,
    isPlacingShips,
    board,
    setPlayerActive
  };
}

export { Player };
