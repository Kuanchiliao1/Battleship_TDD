import { createTestScheduler } from 'jest';
import { Player } from '../Player';

let human;
let computer;

beforeEach(() => {
  human = Player('Human');
  computer = Player('Computer');
});

test("that human can attack computer's board", () => {
  human.attack([0, 0], computer.board);
  expect(() =>
    human
      .attack([0, 0], computer.board)
      .toThrow('Can not hit the same spot twice!')
  );
});

test('that AI does not shoot same spot twice', () => {
  computer.attack([0, 0], human.board);
  expect(() =>
    computer
      .attack([0, 0], human.board)
      .toThrow('Can not hit the same spot twice!')
  );
});

test('that AI can attack by itself', () => {
  let unhitSquareCount = human.board.grid.filter((square) =>
    human.board.checkCoordsUnhit(square.coords)
  ).length;

  computer.attack([], human.board);

  unhitSquareCount = human.board.grid.filter((square) =>
    human.board.checkCoordsUnhit(square.coords)
  ).length;

  expect(unhitSquareCount).toBe(99);
});

// Set up testing to return the attacked coords

// private;
// checkAttackValid();
