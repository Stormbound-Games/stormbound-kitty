import React from 'react'
import CardLink from '~/components/CardLink'
import DryRunnerSettings from '~/components/DryRunnerSettings'
import Row from '~/components/Row'
import Title from '~/components/Title'

const FREEZE_CARD_IDS = ['W1', 'W2', 'W4', 'W6', 'W8', 'W11', 'W32', 'W33']

const containsFreeze = deck =>
  deck.map(card => card.id).some(id => FREEZE_CARD_IDS.includes(id))

// Display the approximation of the count of frozen enemy units on the board
const getFrozenEnemiesText = frozenEnemiesLevel => {
  const frozenStateDescriptionCount = {
    0: 'no',
    2: 'a few',
    3: 'many',
  }
  const frozenStateDescription =
    frozenEnemiesLevel === 4
      ? 'The whole board is frozen.'
      : frozenEnemiesLevel === 1
      ? 'There is a frozen enemy on the board.'
      : `There are ${frozenStateDescriptionCount[frozenEnemiesLevel]} frozen enemies on the board.`

  return frozenStateDescription
}

// Get the text that should be displayed to indicate how many Frozen Cores there
// are on the board
const getFrozenCoreText = activeFrozenCores => {
  return (
    <>
      There {activeFrozenCores === 1 ? 'is' : 'are'}{' '}
      {activeFrozenCores ? activeFrozenCores : 'no'}{' '}
      <CardLink id='W9'>
        Frozen {activeFrozenCores === 1 ? 'Core' : 'Cores'}
      </CardLink>{' '}
      on the board.
      <br />
    </>
  )
}

// Get the text that should be displayed to indicate how many Dawnsparks there
// are on the board
const getDawnsparksText = activeDawnsparks => {
  return (
    <>
      There {activeDawnsparks === 1 ? 'is' : 'are'}{' '}
      {activeDawnsparks ? activeDawnsparks : 'no'} <CardLink id='W16' />{' '}
      {activeDawnsparks === 0
        ? ''
        : activeDawnsparks === 1
        ? 'unit '
        : 'units '}
      on the board.
      <br />
    </>
  )
}

// Get the text that should be displayed to indicate how many Orgone Leechers
// there are on the board
const getOrgoneLeechersText = activeOrgoneLeechers => {
  return (
    <>
      There {activeOrgoneLeechers === 1 ? 'is' : 'are'}{' '}
      {activeOrgoneLeechers ? activeOrgoneLeechers : 'no'} <CardLink id='W33' />{' '}
      {activeOrgoneLeechers === 0
        ? ''
        : activeOrgoneLeechers === 1
        ? 'unit '
        : 'units '}
      on the board.
      <br />
    </>
  )
}

export default React.memo(function DryRunnerInfo(props) {
  const deckIds = props.deck.map(card => card.id)
  const containsFrozenCore = deckIds.includes('W9')
  const containsDawnsparks = deckIds.includes('W16')
  const containsOrgoneLeechers = deckIds.includes('W33')
  const deckContainsFreeze = containsFreeze(props.deck)

  return (
    <Row isDesktopOnly>
      <Row.Column>
        <DryRunnerSettings {...props} />
      </Row.Column>

      <Row.Column>
        <Title>Statistics</Title>

        {props.turn === 1 ? (
          <p>
            Statistics will start showing up at the beginning of the next turn.
          </p>
        ) : (
          <>
            <p>
              It has been <span className='Highlight'>{props.turn} turns</span>,
              during which you’ve played{' '}
              <span className='Highlight'>{props.totalCardsPlayed} cards</span>{' '}
              (about{' '}
              <span className='Highlight'>
                {(props.totalCardsPlayed / props.turn).toFixed(2)} cards per
                turn
              </span>
              ).
            </p>

            <p>
              Of these turns,{' '}
              <span className='Highlight'>{props.turnsWithLeftOverMana}</span>{' '}
              of them left you with some unused mana, for a total of{' '}
              <span className='Highlight'>
                {props.totalUnspentMana} unspent mana{' '}
                {props.totalUnspentMana === 1 ? 'point' : 'points'}
              </span>{' '}
              in the game.
            </p>

            <p>
              You’ve willingly not cycled a card on{' '}
              <span className='Highlight'>
                {props.turnsWithoutCycling}{' '}
                {props.turnsWithoutCycling === 1 ? 'turn' : 'turns'}
              </span>
              .
            </p>

            {(containsFrozenCore ||
              containsDawnsparks ||
              containsOrgoneLeechers ||
              deckContainsFreeze) && (
              <p>
                {containsFrozenCore &&
                  getFrozenCoreText(props.specifics.activeFrozenCores)}
                {containsDawnsparks &&
                  getDawnsparksText(props.specifics.activeDawnsparks)}
                {containsOrgoneLeechers &&
                  getOrgoneLeechersText(props.specifics.activeOrgoneLeechers)}
                {deckContainsFreeze &&
                  getFrozenEnemiesText(props.specifics.frozenEnemiesLevel)}
              </p>
            )}
          </>
        )}
      </Row.Column>
    </Row>
  )
})
