import { createTestScheduler } from 'jest';
import { Player } from '../Player';
import { Board } from '../Board';

let human;
let computer;

beforeEach(() => {
  const humanBoard = Board(10);
  const computerBoard = Board(10);

  human = Player('Human', computerBoard);
  computer = Player('Computer', humanBoard);
});

test("that human can attack computer's board", () => {
  human.attack([0, 0]);
  expect(human.attack([0, 0]).toThrow('Can not hit the same spot twice!'));
});

test('that AI does not shoot same spot twice', () => {
  computer.attack([0, 0]);
  expect(computer.attack([0, 0]).toThrow('Can not hit the same spot twice!'));
});
