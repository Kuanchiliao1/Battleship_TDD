import { Ship } from '../Ship';

let ship;

// length
beforeEach(() => {
  ship = Ship(3);
  return ship;
});

// Startup before each test
it('returns true when it is sunk', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('is not sunk when hit once', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
