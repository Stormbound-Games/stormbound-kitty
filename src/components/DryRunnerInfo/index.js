import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Hint from '../Hint'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default React.memo(function DryRunnerInfo(props) {
  const deckIds = props.deck.map(card => card.id)
  const containsFrozenCore = deckIds.includes('W9')
  const containsDawnsparks = deckIds.includes('W16')
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
                It has been{' '}
                <span className='Highlight'>{props.turn} turns</span>, during
                which you’ve played{' '}
                <span className='Highlight'>
                  {props.totalCardsPlayed} cards
                </span>{' '}
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
