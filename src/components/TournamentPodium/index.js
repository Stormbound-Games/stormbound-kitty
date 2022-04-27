import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import Link from '~/components/Link'
import MemberList from '~/components/MemberList'
import Teasers from '~/components/Teasers'
import Title from '~/components/Title'

const POINT_VALUE = {
  TOURNAMENT: [9, 6, 3],
  JOUST: [6, 4, 2],
}

const getPodiumData = tournaments => {
  const data = {}

  tournaments.forEach(tournament => {
    tournament.podium.forEach((users, index) => {
      users.forEach(user => {
        if (typeof data[user.slug] === 'undefined') {
          data[user.slug] = { user, medals: [], points: 0 }
        }

        data[user.slug].medals.push({
          type: tournament.type,
          place: index,
          points: POINT_VALUE[tournament.type][index],
        })
        data[user.slug].points += POINT_VALUE[tournament.type][index]
      })
    })
  })

  return data
}

const getOverallPodium = tournaments => {
  const medals = getPodiumData(tournaments)
  const users = Object.keys(medals)

  return users
    .sort((a, b) => medals[b].points - medals[a].points)
    .map(slug => medals[slug])
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

const getCard = (cardsIndex, index, user) => ({
  name: user.name,
  faction: ['swarm', 'neutral', 'ironclad'][index],
  level: index + 1,
  mana: index + 1,
  type: 'unit',
  unitTypes: [['Champion', 'Conqueror', 'Runner-up'][index]],
  image: cardsIndex[['N54', 'N32', 'N3'][index]].image,
})

const useTeasers = podium => {
  const { cardsIndex } = React.useContext(CardsContext)

  return podium.slice(0, 3).map(({ user, medals, points }, index) => {
    const [nGold, sGold] = getMedalDetails(medals, 0)
    const [nSilver, sSilver] = getMedalDetails(medals, 1)
    const [nBronze, sBronze] = getMedalDetails(medals, 2)

    return {
      title: (
        <>
          {index + 1}. <Link to={'/members/' + user.slug}>{user.name}</Link>
        </>
      ),
      meta: `With ${points} points`,
      card: getCard(cardsIndex, index, user),
      excerpt: (
        <>
          {user.name} has won {nGold} 🥇&nbsp;gold medal
          {nGold === 1 ? '' : 's'} ({sGold} points), 🥈&nbsp;{nSilver} silver
          medal
          {nSilver === 1 ? '' : 's'} ({sSilver} points) and 🥉&nbsp;{nBronze}{' '}
          bronze medal
          {nBronze === 1 ? '' : 's'} ({sBronze} points).
        </>
      ),
    }
  })
}

export default React.memo(function Podium(props) {
  const { css } = useFela()
  const podium = getOverallPodium(props.tournaments)
  const pointGroups = React.useMemo(() => getPointGroups(podium), [podium])
  const teasers = useTeasers(podium)

  return (
    <>
      <Title>Hall of Fame</Title>

      <Teasers items={teasers} />

      <ol start='4' className={css({ columns: '16em' })}>
        {Object.keys(pointGroups)
          .sort((a, b) => +b - +a)
          .slice(0, 6)
          .map(points => (
            <li key={points}>
              <MemberList members={pointGroups[points]} /> ({points} point
              {points === 1 ? '' : 's'})
            </li>
          ))}
      </ol>
    </>
  )
})
