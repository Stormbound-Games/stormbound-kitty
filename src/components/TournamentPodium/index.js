import React from 'react'
import Article from '../Article'
import Column from '../Column'
import Row from '../Row'
import Teaser from '../Teaser'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import toSentence from '../../helpers/toSentence'
import tournaments from '../../constants/tournaments.json'

const POINT_VALUE = [3, 2, 1]

const getMedals = () => {
  const medals = {}

  tournaments.forEach(tournament => {
    tournament.podium.forEach((user, index) => {
      const users = Array.isArray(user) ? user : [user]

      users.forEach(user => {
        if (typeof medals[user] === 'undefined') {
          medals[user] = [0, 0, 0]
        }

        medals[user][index] += 1
      })
    })
  })

  return medals
}

const getPoints = ([gold, silver, bronze]) =>
  gold * POINT_VALUE[0] + silver * POINT_VALUE[1] + bronze * POINT_VALUE[2]

const getOverallPodium = () => {
  const medals = getMedals()
  const users = Object.keys(medals)

  return users
    .sort((a, b) => getPoints(medals[b]) - getPoints(medals[a]))
    .map(user => [user, medals[user]])
}

export default React.memo(function Podium(props) {
  const podium = getOverallPodium()
  const pointGroups = React.useMemo(
    () =>
      podium.slice(3).reduce((acc, [user, medals]) => {
        const key = String(getPoints(medals))

        if (typeof acc[key] === 'undefined') {
          acc[key] = []
        }

        acc[key].push(user)

        return acc
      }, {}),
    [podium]
  )

  return (
    <Article.FullWidth>
      <Title>Hall of Fame</Title>
      <Row desktopOnly>
        {podium.slice(0, 3).map(([user, medals], index) => (
          <Column width='1/3' key={user}>
            <Teaser
              title={index + 1 + '. ' + user}
              meta={`With ${getPoints(medals)} points`}
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
                  {user} has won {medals[0]} 🥇 gold medal
                  {medals[0] === 1 ? '' : 's'} ({medals[0] * POINT_VALUE[0]}{' '}
                  points), 🥈 {medals[1]} silver medal
                  {medals[1] === 1 ? '' : 's'} ({medals[1] * POINT_VALUE[1]}{' '}
                  points) and 🥉 {medals[2]} bronze medal
                  {medals[2] === 1 ? '' : 's'} ({medals[2] * POINT_VALUE[2]}{' '}
                  point
                  {medals[2] === 1 ? '' : 's'}).
                </>
              }
            />
          </Column>
        ))}
      </Row>

      <ol start='4' style={{ columns: '16em' }}>
        {Object.keys(pointGroups)
          .sort((a, b) => +b - +a)
          .slice(0, 6)
          .map(points => (
            <li>
              {toSentence(pointGroups[points], 'and')} ({points} point
              {points === 1 ? '' : 's'})
            </li>
          ))}
      </ol>
    </Article.FullWidth>
  )
})
