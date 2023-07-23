import { Board } from './Board';

function Player(name) {
  const enemyBoard = Board(10);

  const attack = (coords) => {
    if (enemyBoard.getSquareState(coords) === '🌊') {
      enemyBoard.receiveAttack(coords);
    } else {
      throw new Error('Can not hit the same target twice!');
    }
  };

  return {
    attack,
    name,
  };
}

export { Player };
