function DOM() {
  function renderBoard(board) {
    const emojis = board.grid.map((square) => square.state);

    const boardEl = document.querySelector('.player-board-container');
    emojis.forEach((emoji) => {
      const div = document.createElement('div');
      div.textContent = emoji;
      div.classList.add('square');
      boardEl.append(div);
    });
  }

  function bindEventListeners() {
    
  }

  return { renderBoard };
}

export { DOM };
