import { Board } from '../Board';
import { Player } from '../Player';

// Game loop
// - Ask for player name
// - Create players and boards
// - Populate each with board
// with predefined coords
// - render HTML
// - game ends when allships on
// one side are sunk
beforeEach(() => {
  const playerBoard = Board(10);
  const computerBoard = Board(10);
  const player = Player('Test player');
  const computer = Player('Computer');
});

it('creates boards and players', () => {});

it('populates each board with ships', () => {
  // stuff
});

it('renders the grid elements', () => {
  playerBoard.grid
  // mock the HTML elements
  // test the length?
});
