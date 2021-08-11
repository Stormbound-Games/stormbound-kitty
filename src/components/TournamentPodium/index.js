import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import MemberList from '../MemberList'
import Row from '../Row'
import Teaser from '../Teaser'
import Title from '../Title'
import getRawCardData from '../../helpers/getRawCardData'
import tournaments from '../../data/tournaments.json'

const POINT_VALUE = {
  TOURNAMENT: [9, 6, 3],
  JOUST: [6, 4, 2],
}

const getPodiumData = () => {
  const data = {}

  tournaments.forEach(tournament => {
    tournament.podium.forEach((user, index) => {
      const users = Array.isArray(user) ? user : [user]

      users.forEach(user => {
        if (typeof data[user] === 'undefined') {
          data[user] = { user, medals: [], points: 0 }
        }

        data[user].medals.push({
          type: tournament.type,
          place: index,
          points: POINT_VALUE[tournament.type][index],
        })
        data[user].points += POINT_VALUE[tournament.type][index]
      })
    })
  })

  return data
}

const getOverallPodium = () => {
  const medals = getPodiumData()
  const users = Object.keys(medals)

  return users
    .sort((a, b) => medals[b].points - medals[a].points)
    .map(user => medals[user])
}

const getMedalDetails = (data, index) => {
  const medals = data.filter(medal => medal.place === index)
  const count = medals.length
  const points = medals.reduce(
    (total, medal) => total + POINT_VALUE[medal.type][medal.place],
    0
  )

  return [count, points]
}

const getPointGroups = podium =>
  podium.slice(3).reduce(
    (acc, { user, points }) => ({
      ...acc,
      [points]: (acc[points] || []).concat(user),
    }),
    {}
  )

export default React.memo(function Podium(props) {
  const { css } = useFela()
  const podium = getOverallPodium()
  const pointGroups = React.useMemo(() => getPointGroups(podium), [podium])

  return (
    <>
      <Title>Hall of Fame</Title>
      <div className={css({ fontSize: '85%' })}>
        <Row desktopOnly wideGutter>
          {podium.slice(0, 3).map(({ user, medals, points }, index) => {
            const [nGold, sGold] = getMedalDetails(medals, 0)
            const [nSilver, sSilver] = getMedalDetails(medals, 1)
            const [nBronze, sBronze] = getMedalDetails(medals, 2)

            return (
              <Row.Column width='1/3' key={user}>
                <Teaser
                  title={
                    <>
                      {index + 1}. <Link to={'/member/' + user}>{user}</Link>
                    </>
                  }
                  meta={`With ${points} points`}
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
                      {user} has won {nGold} 🥇 gold medal
                      {nGold === 1 ? '' : 's'} ({sGold} points), 🥈 {nSilver}{' '}
                      silver medal
                      {nSilver === 1 ? '' : 's'} ({sSilver} points) and 🥉{' '}
                      {nBronze} bronze medal
                      {nBronze === 1 ? '' : 's'} ({sBronze} points).
                    </>
                  }
                />
              </Row.Column>
            )
          })}
        </Row>
      </div>

      <ol start='4' className={css({ columns: '16em' })}>
        {Object.keys(pointGroups)
          .sort((a, b) => +b - +a)
          .slice(0, 6)
          .map(points => (
            <li>
              <MemberList members={pointGroups[points]} /> ({points} point
              {points === 1 ? '' : 's'})
            </li>
          ))}
      </ol>
    </>
  )
})
