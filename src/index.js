import './styles.css';
import _ from 'lodash';
import { Game } from './Game';
import { renderBoard } from './DOM';
// comment out later..
import { Board } from './Board';
import { Player } from './Player';

function startGame() {
  const player1 = Player('Player 1 name');
  const player2 = Player('Player 2 name');

  player1.isCurrentPlayer = true;

  const activePlayer = player1.isCurrentPlayer ? player1 : player2;

  player1.board.placeShip(4, [9, 1], 'vertical');
  player1.board.placeShip(3, [3, 0]);
  player1.board.placeShip(3, [5, 5]);

  player2.board.placeShip(3, [5, 5]);

  // while (playerOneVictory || playerTwoVictory) {
  //   // alert('working')
  // }

  player2.attack([0, 0], player1.board);
  player2.attack([3, 0], player1.board);
  player2.attack([4, 0], player1.board);
  player2.attack([5, 0], player1.board);
  player2.attack([6, 5], player1.board);

  player1.attack([4, 0], player2.board);
  player1.attack([5, 0], player2.board);
  player1.attack([6, 5], player2.board);

  renderBoard(player2.board, false, player2.name);
  renderBoard(player1.board, true, player1.name);
  return 'stuff';
}

startGame();
