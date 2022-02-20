import getTournaments from './getTournaments'

const getTournamentsWithAuthor = async author => {
  const tournaments = await getTournaments()

  return tournaments.filter(tournament =>
    tournament.podium
      .flat()
      .map(winner => winner.toLowerCase())
      .includes(author)
  )
}

export default getTournamentsWithAuthor
