import { Ship } from '../Ship';

let ship;

beforeEach(() => {
  const length = 3;
  ship = Ship(length);
});

// Startup before each test
it('returns true when ship is sunk', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('ship is not sunk when hit once', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
