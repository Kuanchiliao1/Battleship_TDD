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

function toggleBoardInactive(name) {
  const elements = document.querySelectorAll(`[data-name="${name}"]`);

  elements.forEach((element) => {
    element.style.cursor = 'not-allowed';
    element.style.pointerEvents = 'none';
    element.style.opacity = '.7';
    // Check out how this is diff than disabling pointer events
  });
}

function gameOver(player) {
  const dialog = document.querySelector('dialog');
  dialog.textContent = `Game over! ${player.name} has won`;
  dialog.showModal();
}

function bindEventListeners(playerOne, playerTwo) {
  const boardEl = document.querySelector('.boards-container');
  // Detect click to register an attack
  boardEl.addEventListener('click', (e) => {
    const { x, y, name } = e.target.dataset;

    // If player two's board is selected
    if (x && y && playerTwo.name === name && !playerOne.isPlacingShips) {
      playerOne.attack([+x, +y], playerTwo.board);
      if (playerTwo.board.checkAllShipsSunk()) {
        gameOver(playerOne);
      }
      playerOne.isCurrentPlayer = false;

      // AI attacks after 3 seconds;
      setTimeout(() => {
        playerTwo.attack([], playerOne.board);
        if (playerOne.board.checkAllShipsSunk()) {
          gameOver(playerTwo);
        }
        playerOne.isCurrentPlayer = true;
        render(playerOne, playerTwo);
      }, 1000);
      render(playerOne, playerTwo);

      if (!playerOne.isCurrentPlayer) {
        toggleBoardInactive(playerTwo.name);
      }
    }
  });

  // Detect and register click to place ship if preview function passes
  boardEl.addEventListener(
    'click',
    (e) => {
      const { name } = e.target.dataset;
      const playerOneSelected = playerOne.name === name;

      if (playerOneSelected && playerOne.isPlacingShips) {
        const elements = document.querySelectorAll(
          `[data-name="${playerOne.name}"]`
        );
        elements.forEach((element) => {
          addEmojiBackground(element.textContent, element);
        });

        const { x, y } = e.target.dataset;
        const preview = playerOne.board.shipPlacementPreview(
          3,
          [+x, +y],
          'horizontal'
        );
        if (preview.isValidPlacement) {
          playerOne.board.placeShip(3, [+x, +y], 'horizontal');
          if (playerOne.board.checkAllShipsPlaced()) {
            playerOne.isPlacingShips = false;
          }
          render(playerOne, playerTwo);
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
      const playerOneSelected = playerOne.name === name;

      if (playerOneSelected && playerOne.isPlacingShips) {
        const elements = document.querySelectorAll(
          `[data-name="${playerOne.name}"]`
        );
        elements.forEach((element) => {
          addEmojiBackground(element.textContent, element);
        });

        const { x, y } = e.target.dataset;
        const preview = playerOne.board.shipPlacementPreview(
          3,
          [+x, +y],
          'horizontal'
        );
        preview.allCoords.forEach((coords) => {
          const [xPos, yPos] = coords;
          const squareEl = document.querySelector(
            `[data-name="${playerOne.name}"][data-x="${xPos}"][data-y="${yPos}"]`
          );

          if (playerOne.board.checkCoordsInBound(coords)) {
            if (preview.isValidPlacement) {
              squareEl.style.background = 'hsl(120, 73%, 65%)';
            } else {
              squareEl.style.background = 'red';
            }
          }
        });
      }
    },
    false
  );

  const themeBtns = document.querySelectorAll('.theme-btn');
  const themeArray = [
    '0deg, #D9AFD9 0%, #97D9E1 100%',
    '90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%',
    '147deg, #FFE53B 0%, #FF2525 74%', // This gradient is repeated
    'to top, #a18cd1 0%, #fbc2eb 100%',
    '99deg,  rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118%',
    '109.6deg,  rgba(247,253,166,1) 11.2%, rgba(128,255,221,1) 57.8%, rgba(255,128,249,1) 85.9%',
  ];

  themeBtns.forEach((btn, index) => {
    btn.style.cssText += `background-image: linear-gradient(${themeArray[index]}); border: white solid 3px;`;

    btn.addEventListener('click', () => {
      document.body.style.cssText += `background-image: linear-gradient(${themeArray[index]});`;
    });
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
