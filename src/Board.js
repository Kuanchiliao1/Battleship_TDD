import { Ship } from './Ship';

function Board(width) {
  const grid = [];

  for (let i = 9; i >= 0; i--) {
    for (let j = 0; j < width; j++) {
      grid.push({ ship: null, state: '🌊', coords: [j, i] });
    }
  }

  grid;

  function placeShip(length, coords, direction = 'horizontal') {
    if (direction === 'horizontal') {
      const [x, y] = coords;
      const ship = Ship(length);

      for (let i = 0; i < length; i++) {
        const square = getSquare([x + i, y]);
        square.ship = ship;
      }
    }
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

  return { grid, placeShip, getShipCoords };
}

const board = Board(10);
board.placeShip(3, [0, 0]);


export { Board };
