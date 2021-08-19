const findFrontRow = (board, player) => {
  if (player === 'RED') {
    const row = [...board]
      .reverse()
      .find(row => row.some(cell => cell.player === player))
    const index = board.indexOf(row)

    // If there are no rows with red units, return the top row as the front
    // line
    if (index === -1) {
      return 0
    }

    // If there are blue units on the very bottom row of the board, return the
    // second to last row as the front line
    if (index === board.length - 1) {
      return board.length - 2
    }

    // Otherwise return the found row
    return index
  } else if (player === 'BLUE') {
    const row = board.find(row => row.some(cell => cell.player === player))
    const index = board.indexOf(row)

    // If there are no rows with blue units, return the last row as the front
    // line
    if (index === -1) return board.length - 1

    // If there are blue units on the very top row of the board, return the
    // second row as the front line
    if (index === 0) return 1

    // Otherwise return the found row
    return index
  }
}

export default findFrontRow
