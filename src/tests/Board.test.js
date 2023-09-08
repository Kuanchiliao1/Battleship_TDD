import { Board } from '../Board';

// *LEGEND*
// unhit ship: '🛥️',
// missed shot: '➖',
// unhit empty water: '🌊',
// sunk ship: '☠️',
// hit but unsunk ship: '💥'

let board;

beforeEach(() => {
  const length = 10;
  board = Board(length);
});

it.only('place ship in correct coords', () => {
  // length, x, y, orientation
  board.placeShip(3, [0, 0]);

  // coords: [[0,0], [0,1], [0,2]]
  expect(board.getShipCoords([0, 0])).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

it.only('checks if one total ship is sunk', () => {
  board.placeShip(3, [0, 0]);

  expect(board.checkAllShipsSunk()).toBe(false);

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 0]);
  board.receiveAttack([2, 0]);

  expect(board.checkAllShipsSunk()).toBe(true);
});

it.only('checks if two total ships are sunk', () => {
  board.placeShip(3, [0, 0]);
  board.placeShip(3, [0, 1]);

  expect(board.checkAllShipsSunk()).toBe(false);

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 0]);
  board.receiveAttack([2, 0]);

  board.receiveAttack([0, 1]);
  board.receiveAttack([1, 1]);
  board.receiveAttack([2, 1]);

  expect(board.checkAllShipsSunk()).toBe(true);
});

it.only('returns ship coordinate array based on single coord', () => {
  board.placeShip(3, [0, 0]);

  expect(board.getShipCoords([0, 0])).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

test.only('hits sink ship', () => {
  const ship = board.placeShip(3, [0, 0]);

  board.receiveAttack([0, 0]);
  expect(ship.isSunk()).toBe(false);
  board.receiveAttack([1, 0]);
  expect(ship.isSunk()).toBe(false);
  board.receiveAttack([2, 0]);
  expect(ship.isSunk()).toBe(true);
});

it.only('tracks board state', () => {
  board.placeShip(3, [0, 0]);
  board.receiveAttack([0, 0]);

  expect(board.getSquareState([0, 0])).toBe('💥');
  expect(board.getSquareState([0, 1])).toBe('🌊');
  expect(board.getSquareState([1, 0])).toBe('🛥️');
});

it.only('checks if square is unhit', () => {
  expect(board.checkCoordsUnhit([0, 0])).toBe(true);
  board.receiveAttack([0, 0]);
  expect(board.checkCoordsUnhit([0, 0])).toBe(false);
});

it.only('generates a random coord that is unhit(any square that has not previously been fired upon)', () => {
  // Attack every square except one. Length hardcoded for now
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // Skip if [0, 0];
      if (i === 0 && j === 0) {
        // eslint-disable-next-line no-continue
        continue;
      }
      board.receiveAttack([i, j]);
    }
  }

  expect(board.getRandUnhitCoords()).toEqual([0, 0]);
});

it.only('returns empty array if all coords have been hit', () => {
  // Attack every square. Length hardcoded for now
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.receiveAttack([i, j]);
    }
  }

  // Expect getRandUnhitCoord() to return empty array if nothing there
  expect(board.getRandUnhitCoords().length).toBe(0);
});

test.only('that preview function returns an array of a ships coordinates and boolean', () => {
  const coords = [0, 0];
  let len = 3;
  let preview = board.shipPlacementPreview(len, coords, 'horizontal');
  expect(preview.allCoords.length).toBe(3);
  expect(preview.allCoords).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);

  len = 5;
  preview = board.shipPlacementPreview(len, coords, 'vertical');
  expect(preview.allCoords.length).toBe(5);
  expect(preview.allCoords).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

it.only('returns a boolean indicating whether ship may be placed', () => {
  const coords = [0, 0];
  const len = 3;
  let preview = board.shipPlacementPreview(len, coords, 'horizontal');
  expect(preview.isValidPlacement).toBe(true);

  board.placeShip(len, coords, 'horizontal');
  preview = board.shipPlacementPreview(len, coords, 'horizontal');
  expect(preview.isValidPlacement).toBe(false);
});

it('returns current player board view as array of emojis', () => {
  expect(board.getAllEmojis());
});

it('returns enemy player board view as array of emojis', () => {
  expect(board.getAllEmojis('enemy'));
});

it('launches a random attack if no argument', () => {
  board.receiveAttack();
});

// private
it.only('makes grid with correct number of squares', () => {
  // for 10x10 grid
  // only keeping grid public for testing!!
  expect(board.grid.flat().length).toBe(100);
});
