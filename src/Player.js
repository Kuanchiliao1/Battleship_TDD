import { Board } from './Board';

function Player(name, number) {
  const isCurrentPlayer = false;
  const board = Board(10);

  const attack = (coords, board) => {
    if (['🌊', '🛥️'].includes(board.getSquareState(coords))) {
      board.receiveAttack(coords);
    } else {
      throw new Error('Can not hit the same target twice!');
    }
  };

  return {
    attack,
    name,
    isCurrentPlayer,
    board,
    number
  };
}

export { Player };
