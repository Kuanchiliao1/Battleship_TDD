import { createTestScheduler } from 'jest';
import { Player } from '../Player';

let human;
let computer;

beforeEach(() => {
  human = Player('Human');
  computer = Player('Computer');
});

test("that human can attack computer's board", () => {
  'Player can attack';

  human.attack([0, 0]);
});

test("that human can attack computer's board", () => {
  human.displayEnemyBoard();
  human.displayBoard();
});

test('that AI does not shoot same spot twice', () => {
  computer.attack([0, 0]);
  expect(computer.attack([0, 0]).toThrow('Can not hit the same spot twice!'));
});
