function renderBoard(board, isActive, playerNumber) {
  const boardEl = document.querySelector(
    `.player-${playerNumber}-board-container`
  );

  const emojis = board.grid.map((square) => {
    const checkHiddenShip = !isActive && square.state === '🛥️';
    return checkHiddenShip ? '🌊' : square.state;
  });

  emojis.forEach((emoji) => {
    const div = document.createElement('div');
    div.textContent = emoji;
    div.classList.add('square');

    if (emoji === '🛥️') {
      div.style.background = 'hsl(120, 73%, 65%)';
    } else if (emoji === '💥') {
      div.style.background = 'orange';
    } else if (emoji === '☠️') {
      div.style.background = 'black';
    }
    boardEl.append(div);
  });
}

function bindEventListeners() {
  const boardEl = document.querySelector('.boards');
}

export { renderBoard, bindEventListeners };
