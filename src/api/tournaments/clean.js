const clean = tournament => {
  const [year, month] = tournament.date.split(/[-/]/g)

  tournament.date = month + '/' + year
  tournament.podium = tournament.podium.map(step => step.players)
  tournament.description = tournament.description || ''

  delete tournament._createdAt
  delete tournament._updatedAt
  delete tournament._id
  delete tournament._rev
  delete tournament._type

  return tournament
}

export default clean
