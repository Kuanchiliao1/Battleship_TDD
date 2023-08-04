import './styles.css';
import _ from 'lodash';
import { bindEventListeners, renderBoard } from './DOM';
// comment out later..
import { Player } from './Player';

function startGame() {
  // prompt player for name
  const player1 = Player('Player');
  const player2 = Player('A.I.');

  player1.isCurrentPlayer = true;

  // const activePlayer = () => (player1.isCurrentPlayer ? player1 : player2);
  // const switchActivePlayer = () => {
  //   player1.isCurrentPlayer = !player1.isCurrentPlayer;
  //   player2.isCurrentPlayer = !player2.isCurrentPlayer;
  // };

  // Let player place all ships(its hardcoded for now)
  player1.board.placeShip(4, [9, 1], 'vertical');
  player1.board.placeShip(3, [3, 0]);
  player1.board.placeShip(3, [5, 5]);

  player2.board.placeShip(3, [5, 5]);
  player2.board.placeShip(2, [4, 6]);

  player2.attack([0, 0], player1.board);
  player2.attack([3, 0], player1.board);
  player2.attack([4, 0], player1.board);
  player2.attack([5, 0], player1.board);
  player2.attack([6, 5], player1.board);

  player1.attack([4, 0], player2.board);
  player1.attack([5, 0], player2.board);
  player1.attack([6, 5], player2.board);

  renderBoard(player2, false);
  renderBoard(player1, true);

  if (player2.board.checkAllShipsSunk()) {
    console.log('player 1 wins!');
  }
  bindEventListeners(player1, player2, renderBoard);

  // Loop until someone's ships are completely sunk. Go one at a time.
    // While player1+player2.board.checkAllShipsSunk() is false, keep going
    // Set up logic that allows player to enter coords to attack...
    //
  // Ask via prompt first, then integrate into the DOM
    // player 1 attacks by inputing with prompt()
    // player1.attack() is called with the inputs
    // set player1.isCurrentlyActive to false and true for player2
    // player2 does a random attack with attack()
  const limit = 20;
  let i = 0
  while (!player1.board.checkAllShipsSunk() && !player2.board.checkAllShipsSunk() && i < limit) {
    // alert('game loop is running!');
    // prompt('enter some coordinates');
    i++
    console.log('loop runs!')
  }

  

  return 'stuff';
}

startGame();
