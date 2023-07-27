function renderBoard(board, isActive, playerName) {
  const boardsContainerEl = document.querySelector('.boards-container');

  const boardEl = document.createElement('div');
  boardEl.classList.add('board-container');

  const nameEl = document.createElement('p');
  nameEl.textContent = playerName;

  const container = document.createElement('div');
  container.append(nameEl, boardEl);

  boardsContainerEl.append(container);

  const squares = board.grid.map((square) => {
    const checkHiddenShip = !isActive && square.state === '🛥️';
    const emoji = checkHiddenShip ? '🌊' : square.state;
    const { coords } = square;

    // Need to return obj with coords and emoji
    return { emoji, coords };
  });

  squares.forEach((square) => {
    const div = document.createElement('div');
    div.textContent = square.emoji;
    div.classList.add('square');
    div.dataset.x = square.coords[0].toString();
    div.dataset.y = square.coords[1].toString();

    addEmojiBackground(square.emoji, div);
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
