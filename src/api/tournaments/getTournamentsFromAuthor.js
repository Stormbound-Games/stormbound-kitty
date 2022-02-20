import getTournaments from './getTournaments'

const getTournamentsFromAuthor = async author => {
  const tournaments = await getTournaments()

  return tournaments.filter(tournament =>
    tournament.hosts.map(host => host.toLowerCase()).includes(author)
  )
}

export default getTournamentsFromAuthor
