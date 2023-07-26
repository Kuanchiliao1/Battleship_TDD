import './styles.css';
import _ from 'lodash';
import { Game } from './Game';
import { renderBoard } from './DOM';
// comment out later..
import { Board } from './Board';
import { Player } from './Player';

function startGame() {
  const board1 = Board(10);
  const board2 = Board(10);

  board1.placeShip(4, [9, 1], 'vertical');
  board1.placeShip(3, [3, 0]);
  board1.placeShip(3, [5, 5]);

  const player1 = Player('Test player1');
  const player2 = Player('Test player2');

  // while (playerOneVictory || playerTwoVictory) {
  //   // alert('working')
  // }

  board1.receiveAttack([0, 0]);
  board1.receiveAttack([3, 0]);
  board1.receiveAttack([4, 0]);
  board1.receiveAttack([5, 0]);
  board1.receiveAttack([6, 5]);

  player2.attack([5, 1], board1);

  renderBoard(board1);
  return 'stuff';
}

startGame();
