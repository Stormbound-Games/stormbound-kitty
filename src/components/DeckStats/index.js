import React from 'react'
import { useFela } from 'react-fela'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import canCardBePlayed from '~/helpers/canCardBePlayed'
import canDeployUnits from '~/helpers/canDeployUnits'
import styles from './styles'

const getEffectiveSpeed = card => {
  switch (card.id) {
    // Doppelbocks effectively advances the frontline.
    case 'S1':
      return 1
    case 'W31':
      // Iceflakes not only does not have initial movement, but it’s also frozen
      // for a turn, which essentially negate its natural movement from the next
      // turn.
      return -0.5
    case 'S16':
      // Dreadfauns has an average speed of about 0.5. Out of the 16 slots it
      // can be played, 2 of them always move the line (corners), 8 of them have
      // 2 chances out of 3 to move the line (edges), and the 6 remaining ones
      // have 1 chance out of 2 to move the line (middle).
      return 0.625
    case 'N67':
      // Wild Saberpaws can have 0, 1 or 2 speed based on whether they are
      // played with bordering or surrounding units, so we consider an average
      // speed of 1.
      return 1
    case 'I17':
      // Eloth the Ignited has 0 base movement, but can be used to move in front
      // of the first enemy (and then 1 extra tile if it kills it), so we
      // consider an average of 2.
      return 2
    default:
      return card.movement || 0
  }
}
const sum = (a, b) => a + b
const getAverageManaCost = cards =>
  (cards.map(c => c.mana).reduce(sum, 0) / cards.length).toFixed(2)
const getAverageSpeed = cards =>
  (cards.map(getEffectiveSpeed).reduce(sum, 0) / cards.length).toFixed(2)
const getAverageLevel = cards =>
  (cards.map(c => c.level).reduce(sum, 0) / cards.length).toFixed(2)

const getPlayableCards = (mana, cards) =>
  cards.filter(card =>
    canCardBePlayed(mana, card, {
      turn: 1,
      emptyCells: true,
      frozenEnemies: false,
      noUnits: !canDeployUnits(mana - card.mana, cards),
    })
  )

const getRaces = cards => [...new Set(cards.map(c => c.race).filter(Boolean))]

export default React.memo(function DeckStats(props) {
  const { css } = useFela()
  const cards = props.deck.map(getResolvedCardData)
  const averageMana = getAverageManaCost(cards)
  const averageSpeed = getAverageSpeed(cards)
  const averageLevel = getAverageLevel(cards)
  const units = cards.filter(c => c.type === 'unit')
  const structures = cards.filter(c => c.type === 'structure')
  const spells = cards.filter(c => c.type === 'spell')
  const races = getRaces(cards)
  const playableCards1 = getPlayableCards(3, cards)
  const playableCards2 = getPlayableCards(4, cards)
  const movingCards1 = playableCards1.filter(
    card => getEffectiveSpeed(card) > 0
  )
  const movingCards2 = playableCards2.filter(
    card => getEffectiveSpeed(card) > 0
  )

  return (
    <Spacing top={['BASE', 'NONE']}>
      <Title>Statistics</Title>

      <Row>
        <Row.Column>
          <p>
            This deck (level ~{averageLevel}) is made of {cards.length} cards:{' '}
            <span
              className={css(styles.trigger)}
              onMouseOver={() => props.highlight(units)}
              onMouseOut={() => props.highlight([])}
            >
              {units.length}
            </span>{' '}
            {units.length > 1 ? 'units' : 'unit'},{' '}
            <span
              className={css(styles.trigger)}
              onMouseOver={() => props.highlight(structures)}
              onMouseOut={() => props.highlight([])}
            >
              {structures.length}
            </span>{' '}
            {structures.length > 1 ? 'structures' : 'structure'}, and{' '}
            <span
              className={css(styles.trigger)}
              onMouseOver={() => props.highlight(spells)}
              onMouseOut={() => props.highlight([])}
            >
              {spells.length}
            </span>{' '}
            {spells.length > 1 ? 'spells' : 'spell'}. It contains {races.length}{' '}
            {races.length > 1 ? 'different races' : 'single race'}.
          </p>

          <p>
            Its average speed is{' '}
            <strong className='Highlight'>{averageSpeed}</strong> cell on play.
            Its average mana cost is{' '}
            <strong className='Highlight'>{averageMana}</strong>.{' '}
            <strong
              className={'Highlight ' + css(styles.trigger)}
              onMouseOver={() => props.highlight(playableCards1)}
              onMouseOut={() => props.highlight([])}
            >
              {playableCards1.length}
            </strong>{' '}
            cards can be played as the first player (
            <strong
              className={'Highlight ' + css(styles.trigger)}
              onMouseOver={() => props.highlight(movingCards1)}
              onMouseOut={() => props.highlight([])}
            >
              {movingCards1.length}
            </strong>{' '}
            of them moving the front line),{' '}
            <strong
              className={'Highlight ' + css(styles.trigger)}
              onMouseOver={() => props.highlight(playableCards2)}
              onMouseOut={() => props.highlight([])}
            >
              {playableCards2.length}
            </strong>{' '}
            as the second player (
            <strong
              className={'Highlight ' + css(styles.trigger)}
              onMouseOver={() => props.highlight(movingCards2)}
              onMouseOut={() => props.highlight([])}
            >
              {movingCards2.length}
            </strong>{' '}
            of them moving the front line).
          </p>
        </Row.Column>
      </Row>
    </Spacing>
  )
})
