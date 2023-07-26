function renderBoard(board) {
  const emojis = board.grid.map((square) => square.state);

  const playerOneBoardEl = document.querySelector('.player-one-board-container');
  const playerTwoBoardEl = document.querySelector('.player-two-board-container');

  emojis.forEach((emoji) => {
    const div = document.createElement('div');
    div.textContent = emoji;
    div.classList.add('square');
    playerOneBoardEl.append(div);
  });
}

function bindEventListeners() {
  const boardEl = document.querySelector('.player-board-container');
}

export { renderBoard, bindEventListeners };
