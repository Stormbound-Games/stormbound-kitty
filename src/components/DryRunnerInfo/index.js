import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Hint from '../Hint'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default React.memo(function DryRunnerInfo(props) {
  const deckMainIds = props.deck.map(card => card.id.split('#')[0])
  const containsFrozenCore = deckMainIds.includes('W9')
  const containsDawnsparks = deckMainIds.includes('W16')
  const containsFreeze = props.containsFreeze(props.deck)

  return (
    <div className='DryRunnerInfo'>
      <Row desktopOnly>
        <Column>
          <Title>What is this</Title>
          <p>
            This simulator has same{' '}
            <Link to='/faq#drawing-algorithm'>drawing/cycling mechanics</Link>{' '}
            as the game and should be an accurate representation of how playing
            your deck would feel. It can be useful to evaluate card cycling,
            mana flow and combo efficiency. Additionally,{' '}
            <Link to='/faq#dry-runner-mechanics'>many card abilities</Link> are
            also implemented in this simulator.
          </p>

          {props.deck.map(card => card.id).includes('N38') && (
            <Hint>
              Due to the lack of opponent’s deck, Harvester of Souls’ ability
              has not been implemented.
            </Hint>
          )}

          <DryRunnerRNGField
            RNG={props.RNG}
            setRNG={props.setRNG}
            deck={props.deck}
          />
        </Column>

        <Column>
          <Title>Statistics</Title>

          {props.turn === 1 ? (
            <p>
              Statistics will start showing up at the beginning of the next
              turn.
            </p>
          ) : (
            <>
              <p>
                It has been {props.turn} turns, during which you’ve played{' '}
                {props.totalCardsPlayed} cards (about{' '}
                {(props.totalCardsPlayed / props.turn).toFixed(2)} cards per
                turn).
              </p>

              <p>
                Of these turns, {props.turnsWithLeftOverMana} of them left you
                with some unused mana, for a total of {props.totalUnspentMana}{' '}
                unspent mana {props.totalUnspentMana === 1 ? 'point' : 'points'}{' '}
                in the game.
              </p>

              <p>
                You’ve willingly not cycled a card on{' '}
                {props.turnsWithoutCycling}{' '}
                {props.turnsWithoutCycling === 1 ? 'turn' : 'turns'}.
              </p>

              {containsFrozenCore ||
                containsDawnsparks ||
                (containsFreeze && (
                  <p>
                    {containsFrozenCore && props.getFrozenCoreText()}
                    {containsDawnsparks && props.getDawnsparksText()}
                    {containsFreeze && props.getFrozenEnemiesText()}
                  </p>
                ))}
            </>
          )}
        </Column>
      </Row>
    </div>
  )
})
