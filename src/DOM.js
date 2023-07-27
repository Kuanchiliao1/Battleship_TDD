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

    addEmojiBackground(emoji, div);
    boardEl.append(div);
  });
}

function bindEventListeners() {
  const boardEl = document.querySelector('.boards');
}

// Private
function addEmojiBackground(emoji, element) {
  if (emoji === '🛥️') {
    element.style.background = 'hsl(120, 73%, 65%)';
  } else if (emoji === '💥') {
    element.style.background = 'orange';
  } else if (emoji === '☠️') {
    element.style.background = 'black';
  } else if (emoji === '➖') {
    element.style.background = '#3ce1d8';
  }
}

export { renderBoard, bindEventListeners };
