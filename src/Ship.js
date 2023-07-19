function Ship(length) {
  let health = length;

  const isSunk = () => {
    if (health < 0) {
      throw new Error('Cannot have negative health!');
    }
    return health === 0
  };

  const hit = () => {
    health -= 1;
  };

  return {
    isSunk,
    hit,
  };
}

export { Ship };
