import { Ship } from './Ship';

function Board(length) {
  const grid = [];

  for (let i = 0; i < length; i++) {
    grid.push(new Array(length).fill('🌊'));
  }

  return { grid };
}

export { Board };
