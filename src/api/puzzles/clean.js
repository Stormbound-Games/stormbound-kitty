const clean = puzzle => {
  const [year, month, day] = puzzle.date.split('-')

  puzzle.date = month + '/' + year
  puzzle.restrictions = puzzle.restrictions || []

  delete puzzle._createdAt
  delete puzzle._updatedAt
  delete puzzle._id
  delete puzzle._rev
  delete puzzle._type

  return puzzle
}

export default clean
