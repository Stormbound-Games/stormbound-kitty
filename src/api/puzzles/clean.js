const clean = puzzle => {
  const [year, month] = puzzle.date.split(/[-/]/g)

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
