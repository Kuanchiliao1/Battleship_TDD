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
        direction === 'horizontal'
          ? getSquare([x + i, y])
          : getSquare([x, y + i]);
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

    if (emoji === '💥' && square.ship.isSunk()) {
      const allShipCoords = getShipCoords(coords);
      allShipCoords.forEach((coords) => (getSquare(coords).state = '☠️'));
    }
  }

  function getSquareState(coords) {
    return getSquare(coords).state;
  }

  function checkAllShipsSunk() {
    return allShips.every((ship) => ship.isSunk());
  }

  function checkCoordsInBound(coords) {
    const [x, y] = coords;
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  function checkCoordsUnhit(coords) {
    const [x, y] = coords;
    // Out of bounds
    if (x < 0 || y < 0 || x >= 10 || y >= 10) return false;

    return getSquareState(coords) === '🌊';
  }

  function getRandUnhitCoords() {
    const unhitSquares = grid.filter((square) => checkCoordsUnhit(square.coords));
    const unhitCoords = unhitSquares.map(square => square.coords);
    const randIndex = Math.floor(Math.random() * unhitCoords.length);

    if (unhitCoords.length === 0) return [];
    return unhitCoords[randIndex];
  }

  return {
    grid,
    placeShip,
    getShipCoords,
    receiveAttack,
    getSquareState,
    checkAllShipsSunk,
    checkCoordsUnhit,
    getRandUnhitCoords,
    checkCoordsInBound
  };
}

const board = Board(10);
board.placeShip(3, [0, 0]);

export { Board };
