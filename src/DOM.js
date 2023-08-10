function renderBoard(player, isActive) {
  const { board, name } = player;
  const boardsContainerEl = document.querySelector('.boards-container');

  const boardEl = document.createElement('div');
  boardEl.classList.add('board-container');

  const nameEl = document.createElement('p');
  nameEl.textContent = name;

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
    div.dataset.name = name;

    addEmojiBackground(square.emoji, div);
    boardEl.append(div);
  });
}

function clearBoards() {
  const boardsContainerEl = document.querySelector('.boards-container');
  boardsContainerEl.innerHTML = '';
}

function render(playerOne, playerTwo) {
  clearBoards();
  renderBoard(playerTwo, false);
  renderBoard(playerOne, true);
}

function bindEventListeners(playerOne, playerTwo) {
  const boardEl = document.querySelector('.boards-container');
  // Detect click to register an attack
  boardEl.addEventListener('click', (e) => {
    const { x, y, name } = e.target.dataset;

    if (x && y && playerTwo.name === name) {
      playerOne.attack([+x, +y], playerTwo.board);
      playerTwo.attack([], playerOne.board);
      render(playerOne, playerTwo);
    }
  });

  // Detect and register click to place ship if preview function passes
  boardEl.addEventListener(
    'click',
    (e) => {
      const { name } = e.target.dataset;
      const selectedPlayer = playerOne.name === name ? playerOne : playerTwo;
      const activePlayer = selectedPlayer === playerOne ? playerTwo : playerOne;

      if (selectedPlayer.isCurrentPlayer) {
        const elements = document.querySelectorAll(
          `[data-name="${selectedPlayer.name}"]`
        );
        elements.forEach((element) => {
          addEmojiBackground(element.textContent, element);
        });

        const { x, y } = e.target.dataset;
        const preview = selectedPlayer.board.shipPlacementPreview(
          3,
          [+x, +y],
          'horizontal'
        );
        if (preview.isValidPlacement) {
          console.log('yes!!');
          selectedPlayer.board.placeShip(3, [+x, +y], 'horizontal');
          clearBoards();
          renderBoard(activePlayer, false);
          renderBoard(selectedPlayer, true);
        }
      }
    },
    false
  );

  // Generates a ship preview on hover to visualize valid ship placements
  boardEl.addEventListener(
    'mouseover',
    (e) => {
      const { name } = e.target.dataset;
      const selectedPlayer = playerOne.name === name ? playerOne : playerTwo;

      if (selectedPlayer.isCurrentPlayer) {
        const elements = document.querySelectorAll(
          `[data-name="${selectedPlayer.name}"]`
        );
        elements.forEach((element) => {
          addEmojiBackground(element.textContent, element);
        });

        const { x, y } = e.target.dataset;
        const preview = selectedPlayer.board.shipPlacementPreview(
          3,
          [+x, +y],
          'horizontal'
        );
        preview.allCoords.forEach((coords) => {
          const [xPos, yPos] = coords;
          const squareEl = document.querySelector(
            `[data-name="${selectedPlayer.name}"][data-x="${xPos}"][data-y="${yPos}"]`
          );

          if (selectedPlayer.board.checkCoordsInBound(coords)) {
            if (preview.isValidPlacement) {
              squareEl.style.background = 'hsl(120, 73%, 65%)';
            } else {
              squareEl.style.background = 'red';
            }
          }
          console.log(squareEl);
        });
      }

      if (!name) {
        render(playerOne, playerTwo);
      }
    },
    false
  );

  const btn1 = document.getElementById('1');
  const btn2 = document.getElementById('2');
  const btn3 = document.getElementById('3');
  const btn4 = document.getElementById('4');
  const btn5 = document.getElementById('5');
  const btn6 = document.getElementById('6');
  const btn7 = document.getElementById('7');
  const btn8 = document.getElementById('8');
  btn1.addEventListener('click', () => {
    document.body.style.cssText += `background-color: #D9AFD9;
    background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    `;
  });
  btn2.addEventListener('click', () => {
    document.body.style.cssText += `background: rgb(63,94,251);
    background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);`;
  });
  btn3.addEventListener('click', () => {
    document.body.style.cssText += `background-color: #FFE53B;
    background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
    `;
  });
  btn4.addEventListener('click', () => {
    document.body.style.cssText += `background-color: #FFE53B;
    background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
    `;
  });
  btn5.addEventListener('click', () => {
    document.body.style.cssText += `background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);`;
  });
  btn6.addEventListener('click', () => {
    document.body.style.cssText += `background-image: linear-gradient( 99deg,  rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% );`;
  });
  btn7.addEventListener('click', () => {
    document.body.style.cssText += `background-color: #FFE53B;
    background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
    `;
  });
  btn8.addEventListener('click', () => {
    document.body.style.cssText += `background-image: linear-gradient( 109.6deg,  rgba(247,253,166,1) 11.2%, rgba(128,255,221,1) 57.8%, rgba(255,128,249,1) 85.9% );`;
  });
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
  } else if (emoji === '🌊') {
    element.style.background = 'hsl(0, 0%, 100%, 15%)';
  }
}

export { renderBoard, bindEventListeners, clearBoards, render };
