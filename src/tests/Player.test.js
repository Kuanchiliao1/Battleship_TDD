import { createTestScheduler } from 'jest';
import { Player } from '../Player';

let human;
let computer;

beforeEach(() => {
  human = Player('Human');
  computer = Player('Computer');
});

test("that human can attack computer's board", () => {
  human.attack([0, 0]);
  expect(() =>
    human.attack([0, 0]).toThrow('Can not hit the same spot twice!')
  );
});

test('that AI does not shoot same spot twice', () => {
  computer.attack([0, 0]);
  expect(() =>
    computer.attack([0, 0]).toThrow('Can not hit the same spot twice!')
  );
});

test('that AI can attack by itself', () => {
  expect(computer.attack());
});

// Set up testing to return the attacked coords

// private;
// checkAttackValid();
