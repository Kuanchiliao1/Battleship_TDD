function Ship(length) {
  let health = length

  const isSunk = () => {
    return health === 0
  }

  const hit = () => {
    health -= 1
  }

  return {
    isSunk,
    hit
  };
}

export { Ship };
