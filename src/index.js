import './styles.css';
import _ from 'lodash';
import { bindEventListeners, render, renderBoard } from './DOM';
// comment out later..
import { Player } from './Player';

function startGame() {
  const totalShipsPerPlayer = 2;
  // prompt player for name
  const player1 = Player('Player', totalShipsPerPlayer);
  const player2 = Player('A.I.', totalShipsPerPlayer);

  player1.isCurrentPlayer = true;
  player1.isPlacingShips = true;

  // const activePlayer = () => (player1.isCurrentPlayer ? player1 : player2);
  // const switchActivePlayer = () => {
  //   player1.isCurrentPlayer = !player1.isCurrentPlayer;
  //   player2.isCurrentPlayer = !player2.isCurrentPlayer;
  // };

  // Let player place all ships(its hardcoded for now)

  player2.board.placeShip(3, [5, 5]);
  player2.board.placeShip(2, [4, 6]);
  player2.board.placeShip(4, [9, 1], 'vertical');
  player2.board.placeShip(3, [3, 0]);

  // renderBoard(player2, false);
  // renderBoard(player1, true);
  render(player1, player2);
  console.log(player1.isPlacingShips); //

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
  // format: two numbers. ex: 00, 90, 99
  // Use basic string splitting to use as input
  // player1.attack() is called with the inputs
  // set player1.isCurrentlyActive to false and true for player2
  // player2 does a random attack with attack()
  // Problem: have to wait for click in order to keep going with the game loop... need to pause it somehow
  // Also make a delay for AI to make its attack
  // const limit = 2;
  // let i = 0
  // while (!player1.board.checkAllShipsSunk() && !player2.board.checkAllShipsSunk() && i < limit) {
  //   render(player1, player2);
  //   const attackCoords = prompt('enter coords ex: 11');
  //   const attackCoordsArray = attackCoords.split('').map(coord => +coord);

  //   player1.attack(attackCoordsArray, player2.board);

  //   render(player1, player2);

  //   player2.attack([], player1.board)

  //   render(player1, player2);

  //   console.log(attackCoordsArray)
  //   // alert('game loop is running!');
  //   // prompt('enter some coordinates');
  //   i++
  //   console.log('loop runs!')
  // }

  return 'stuff';
}

startGame();
