function renderBoard(board, isActive, playerName) {
  const boardsContainerEl = document.querySelector('.boards-container');

  const boardEl = document.createElement('div');
  boardEl.classList.add('board-container');

  const nameEl = document.createElement('p');
  nameEl.textContent = playerName;

  const container = document.createElement('div');
  container.append(nameEl, boardEl);

  boardsContainerEl.append(container);

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
