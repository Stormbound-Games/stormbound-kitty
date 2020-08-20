import React from 'react'
import HeaderBanner from '../HeaderBanner'
import Title from '../Title'
import Column from '../Column'
import Row from '../Row'
import Teaser from '../Teaser'
import PageMeta from '../PageMeta'
import tournaments from '../../constants/tournaments.json'
import toSentence from '../../helpers/toSentence'
import getRawCardData from '../../helpers/getRawCardData'
import formatDate from '../../helpers/formatDate'
import './index.css'

const getDate = string => {
  if (!string) return null
  const [day, month, year] = string.split('/')
  return new Date(+(20 + year), +month - 1, +day)
}

const getHallOfFame = () => {
  const hof = {}

  tournaments.forEach(tournament => {
    tournament.winners.forEach(winner => {
      if (typeof hof[winner] === 'undefined') {
        hof[winner] = []
      }
      hof[winner].push(tournament)
    })
  })

  return Object.keys(hof)
    .map(user => [user, hof[user]])
    .sort((a, b) => b[1].length - a[1].length)
}

export default React.memo(function TournamentHallOfFame(props) {
  const hallOfFame = getHallOfFame()

  return (
    <>
      <HeaderBanner title='Hall of Fame' />
      <Row desktopOnly>
        {hallOfFame.slice(0, 3).map(([user, tournaments], index) => (
          <Column width='1/3' key={user}>
            <Teaser
              title={
                <>
                  {index + 1}. {user} ({tournaments.length} wins)
                </>
              }
              card={{
                name: user,
                faction: ['swarm', 'neutral', 'ironclad'][index],
                level: index + 1,
                mana: index + 1,
                type: 'unit',
                race: ['Champion', 'Conqueror', 'Runner-up'][index],
                image: getRawCardData(['N54', 'N32', 'N3'][index]).image,
              }}
              excerpt={
                <>
                  {user} has won{' '}
                  {toSentence(
                    tournaments.map(tournament => tournament.name),
                    'and'
                  )}
                  .
                </>
              }
            />
          </Column>
        ))}
      </Row>

      <Title>Tournaments</Title>

      <table className='TournamentHallOfFame__table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Host(s)</th>
            <th>Winner(s)</th>
            <th>Completion date</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map(tournament => (
            <tr key={tournament.name}>
              <td>{tournament.name}</td>
              <td>{toSentence(tournament.hosts, 'and')}</td>
              <td>{toSentence(tournament.winners, 'and')}</td>
              <td>
                {tournament.date
                  ? formatDate(getDate(tournament.date))
                  : 'Unknown date'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PageMeta
        title='Tournaments — Hall of Fame'
        description='Find the list of all past Stormbound tournaments and the hall of fame.'
      />
    </>
  )
})
