import React from 'react'
import { Link } from 'react-router-dom'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import Card from '../Card'
import Column from '../Column'
import Row from '../Row'
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

const CardContestEntry = props => {
  const cardData = getCardData(props.winner.id)

  return (
    <div
      key={props.winner.id}
      className='CardContestEntry'
      style={{ '--color': COLORS[cardData.faction || COLORS.neutral] }}
    >
      <div className='CardContestEntry__inner'>
        <Row desktopOnly wideGutter>
          <Column>
            <Row desktopOnly>
              <Column>
                <Link
                  to={`/card/${props.winner.id}`}
                  className='CardContestEntry__card'
                >
                  <Card {...cardData} />
                </Link>
              </Column>
              {props.winner.id2 ? (
                <Column>
                  <Link
                    to={`/card/${props.winner.id2}`}
                    className='CardContestEntry__card'
                  >
                    <Card {...getCardData(props.winner.id2)} />
                  </Link>
                </Column>
              ) : null}
            </Row>
          </Column>
          <Column>
            <div className='CardContestEntry__content'>
              <span className='CardContestEntry__weekIndex'>
                Week #{WEEKLY_CARD_CONTEST.length - props.index}:{' '}
                <span className='CardContestEntry__contestName'>
                  {props.name}
                </span>
              </span>
              <Link
                to={`/card/${props.winner.id}`}
                className='CardContestEntry__name'
              >
                {cardData.name}
              </Link>
              <span className='CardContestEntry__winner'>
                by {props.winner.author}
              </span>
            </div>
          </Column>
        </Row>
      </div>
    </div>
  )
}

export default CardContestEntry
