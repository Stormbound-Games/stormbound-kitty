const clean = deck => {
  const [year, month] = deck.date.split(/[-/]/g)

  deck.date = month + '/' + year

  if (deck.nerfed) {
    const [year, month] = deck.nerfed.split(/[-/]/g)
    deck.nerfed = month + '/' + year
  }

  delete deck._createdAt
  delete deck._updatedAt
  delete deck._id
  delete deck._rev
  delete deck._type

  return deck
}

export default clean
