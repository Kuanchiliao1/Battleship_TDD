import { Ship } from './Ship';

function Board(width) {
  const grid = [];
  const allShips = [];

  for (let i = 9; i >= 0; i--) {
    for (let j = 0; j < width; j++) {
      grid.push({ ship: null, state: '🌊', coords: [j, i] });
    }
  }

  function placeShip(length, coords, direction = 'horizontal') {
    const [x, y] = coords;
    const ship = Ship(length);
    allShips.push(ship);

    for (let i = 0; i < length; i++) {
      const square =
        direction === 'horizontal' ? getSquare([x + i, y]) : getSquare([x, y + i]);
      square.ship = ship;
      square.state = '🛥️';
    }
    return ship;
  }

  function getShipCoords(coords) {
    const { ship } = getSquare(coords);
    const squares = grid.filter((square) => square.ship === ship);
    const shipCoordsArray = squares.map((square) => square.coords);
    return shipCoordsArray;
  }

  function getSquare(coords) {
    const square = grid.find((square) => {
      const [x, y] = square.coords;
      return coords[0] === x && coords[1] === y;
    });

    return square;
  }

  function receiveAttack(coords) {
    const square = getSquare(coords);
    if (square.ship) {
      square.ship.hit();
    }

    const emoji = square.ship ? '💥' : '➖';
    square.state = emoji;
  }

  function getSquareState(coords) {
    return getSquare(coords).state;
  }

  function checkAllShipsSunk() {
    return allShips.every((ship) => ship.isSunk());
  }

  return {
    grid,
    placeShip,
    getShipCoords,
    receiveAttack,
    getSquareState,
    checkAllShipsSunk,
  };
}

const board = Board(10);
board.placeShip(3, [0, 0]);

export { Board };
