import { Board } from '../Board';

// Public
// placeShip()
// getShip()
// getShipCoords()
// receiveAttack()
// check if ships are all sunk
// getSquareState()

// Private
// grid
// { ship: null, coord: [x, y], checkHasBeenAttacked: true/false }
// ship + miss is impossible
// ship + hit is either hit or sunk
// no ship + empty is blank square
// no ship + hit is miss

let board;

beforeEach(() => {
  // length of grid
  board = Board(10);
  return board;
});

it.only('place ship in correct coords', () => {
  // length, x, y, orientation
  board.placeShip(3, [0, 0]);

  // coords: [[0,0], [0,1], [0,2]]
  // DOuble check this test matcher
  expect(board.getShipCoords([0, 0])).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

it.only('checks if all ships are sunk (1 ship)', () => {
  board.placeShip(3, [0, 0]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 0]);
  board.receiveAttack([2, 0]);

  expect(board.checkAllShipsSunk()).toBe(true);
});

it.only('returns ship based on coord', () => {
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
  // const squareState = {
  //   unhit: '🛥️',
  //   miss: '➖',
  //   empty: '🌊',
  //   sunk: '☠️',
  //   hit: '💥'A
  // }
  expect(board.getSquareState([0, 0])).toBe('💥');
  expect(board.getSquareState([0, 1])).toBe('🌊');
  expect(board.getSquareState([1, 0])).toBe('🛥️');
});

it.only('checks if square is unhit', () => {
  expect(board.checkCoordsUnhit([0, 0])).toBe(true);
  board.receiveAttack([0, 0]);
  expect(board.checkCoordsUnhit([0, 0])).toBe(false);
});

it('returns current player board view as array of emojis', () => {
  expect(board.getAllEmojis());
});

it('returns enemy player board view as array of emojis', () => {
  expect(board.getAllEmojis('enemy'));
});

it('launches a random attack if no argument', () => {
  board.receiveAttack();
})

// private
it.only('makes grid with correct number of squares', () => {
  // for 10x10 grid
  // only keeping grid public for testing!!
  expect(board.grid.flat().length).toBe(100);
});
