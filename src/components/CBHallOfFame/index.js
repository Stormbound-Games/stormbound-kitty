import React from 'react'
import { Link } from '@reach/router'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import Row from '../Row'
import Title from '../Title'
import Column from '../Column'
import Card from '../Card'
import { deserialiseCard } from '../../helpers/deserialise'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const COLORS = {
  neutral: 'rgba(222, 215, 164, 0.5)',
  ironclad: 'var(--ironclad)',
  shadowfen: 'var(--shadowfen)',
  winter: 'var(--winter)',
  swarm: 'var(--swarm)'
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

const CBHallOfFame = props => {
  const weeks = WEEKLY_CARD_CONTEST.filter(contest => !!contest.winner)
  return (
    <div className="CBHallOfFame">
      <Title>Hall of Fame</Title>

      {weeks.reverse().map((contest, index) => {
        const cardData = getCardData(contest.winner.id)
        return (
          <div
            key={contest.winner.id}
            className="CBHallOfFame__week"
            style={{ '--color': COLORS[cardData.faction || COLORS.neutral] }}
          >
            <div className="CBHallOfFame__inner">
              <Row desktopOnly wideGutter>
                <Column>
                  <Row desktopOnly>
                    <Column>
                      <Link
                        to={`/card/${contest.winner.id}`}
                        className="CBHallOfFame__card"
                      >
                        <Card {...cardData} />
                      </Link>
                    </Column>
                    {contest.winner.id2 ? (
                      <Column>
                        <Link
                          to={`/card/${contest.winner.id2}`}
                          className="CBHallOfFame__card"
                        >
                          <Card {...getCardData(contest.winner.id2)} />
                        </Link>
                      </Column>
                    ) : null}
                  </Row>
                </Column>
                <Column>
                  <div className="CBHallOfFame__content">
                    <span className="CBHallOfFame__weekIndex">
                      Week #{weeks.length - index}:{' '}
                      <span className="CBHallOfFame__contestName">
                        {contest.name}
                      </span>
                    </span>
                    <Link
                      to={`/card/${contest.winner.id}`}
                      className="CBHallOfFame__name"
                    >
                      {cardData.name}
                    </Link>
                    <span className="CBHallOfFame__winner">
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

export default CBHallOfFame
