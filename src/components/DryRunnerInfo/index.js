import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Hint from '../Hint'
import Row from '../Row'
import Title from '../Title'
import './index.css'

const DryRunnerInfo = React.memo(props => (
  <div className='DryRunnerInfo'>
    <Row desktopOnly>
      <Column>
        <Title>What is this</Title>
        <p>
          This simulator has same drawing/cycling mechanics as the game and
          should be an accurate representation of how playing your deck would
          feel. It can be useful to evaluate card cycling, mana flow and combo
          efficiency.
        </p>

        <p>
          Many game mechanics are currently implemented in this simulator. To
          learn more about which cards abilities are taken into account and how,
          check out <Link to='/faq#dry-runner-mechanics'>this list</Link>. For
          an explanation of what the drawing algorithm is, check out{' '}
          <Link to='/faq#drawing-algorithm'>this explanation</Link>.
        </p>

        {props.deck.map(card => card.id).includes('N38') && (
          <Hint>
            Due to the lack of opponent’s deck, Harvester of Souls’ ability has
            not been implemented.
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
            Statistics will start showing up at the beginning of the next turn.
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
              You’ve willingly not cycled a card on {props.turnsWithoutCycling}{' '}
              {props.turnsWithoutCycling === 1 ? 'turn' : 'turns'}.
            </p>
            <p>
              {props.deck.map(card => card.id).includes('W9')
                ? props.getFrozenCoreText()
                : null}
              {props.deck.map(card => card.id).includes('W16')
                ? props.getDawnsparksText()
                : null}
              {props.containsFreeze(props.deck)
                ? props.getFrozenEnemiesText()
                : null}
            </p>
          </>
        )}
      </Column>
    </Row>
  </div>
))

export default DryRunnerInfo
