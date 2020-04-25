import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Hint from '../Hint'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import './index.css'

const DryRunnerInfo = props => (
  <div className='DryRunnerInfo'>
    <Row desktopOnly>
      <Column>
        <Title>What is this</Title>
        <p>
          This simulator has same drawing/cycling mechanics as the game and
          should be an accurate representation of mana flow for your deck.
        </p>

        <p>
          It also takes into account <WikiLink id='N8' />, <WikiLink id='N12' />
          , <WikiLink id='N14' />, <WikiLink id='N22' />, <WikiLink id='N33' />,{' '}
          <WikiLink id='N48' />, <WikiLink id='W8' />, <WikiLink id='W10' />,{' '}
          <WikiLink id='W12' /> and <WikiLink id='W19' /> abilities, RNG for{' '}
          <WikiLink id='S3' />, <WikiLink id='W9' /> and <WikiLink id='W16' />{' '}
          as well as cards than cannot actually be played in the first turn
          (e.g. <WikiLink id='F4' />, <WikiLink id='W1' />
          …).
        </p>

        <p>
          Learn more about{' '}
          <Link to='/faq#dry-runner-works'>how the dry-runner works</Link> and{' '}
          <Link to='/faq#drawing-algorithm'>what is the drawing algorithm</Link>
          .
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
)

export default DryRunnerInfo
