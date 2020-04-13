import React from 'react'
import { Link } from 'react-router-dom'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import Card from '../Card'
import Column from '../Column'
import Row from '../Row'
import Title from '../Title'
import { deserialiseCard } from '../../helpers/deserialise'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const COLORS = {
  neutral: 'rgba(222, 215, 164, 0.5)',
  ironclad: 'var(--ironclad)',
  shadowfen: 'var(--shadowfen)',
  winter: 'var(--winter)',
  swarm: 'var(--swarm)',
}

const getCardData = id => {
  const data = deserialiseCard(id)
  data.image = getRawCardData(data.imageCardId).image || data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1
  return data
}

const CardBuilderHallOfFame = props => {
  const weeks = WEEKLY_CARD_CONTEST.filter(contest => !!contest.winner)
  return (
    <div className='CardBuilderHallOfFame'>
      <Title>Hall of Fame</Title>

      {weeks.reverse().map((contest, index) => {
        const cardData = getCardData(contest.winner.id)
        return (
          <div
            key={contest.winner.id}
            className='CardBuilderHallOfFame__week'
            style={{ '--color': COLORS[cardData.faction || COLORS.neutral] }}
          >
            <div className='CardBuilderHallOfFame__inner'>
              <Row desktopOnly wideGutter>
                <Column>
                  <Row desktopOnly>
                    <Column>
                      <Link
                        to={`/card/${contest.winner.id}`}
                        className='CardBuilderHallOfFame__card'
                      >
                        <Card {...cardData} />
                      </Link>
                    </Column>
                    {contest.winner.id2 ? (
                      <Column>
                        <Link
                          to={`/card/${contest.winner.id2}`}
                          className='CardBuilderHallOfFame__card'
                        >
                          <Card {...getCardData(contest.winner.id2)} />
                        </Link>
                      </Column>
                    ) : null}
                  </Row>
                </Column>
                <Column>
                  <div className='CardBuilderHallOfFame__content'>
                    <span className='CardBuilderHallOfFame__weekIndex'>
                      Week #{weeks.length - index}:{' '}
                      <span className='CardBuilderHallOfFame__contestName'>
                        {contest.name}
                      </span>
                    </span>
                    <Link
                      to={`/card/${contest.winner.id}`}
                      className='CardBuilderHallOfFame__name'
                    >
                      {cardData.name}
                    </Link>
                    <span className='CardBuilderHallOfFame__winner'>
                      by {contest.winner.author}
                    </span>
                  </div>
                </Column>
              </Row>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CardBuilderHallOfFame
