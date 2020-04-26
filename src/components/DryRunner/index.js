import React from 'react'
import DryRunnerCardLog from '../DryRunnerCardLog'
import Checkbox from '../Checkbox'
import Column from '../Column'
import Deck from '../Deck'
import DryRunnerActions from '../DryRunnerActions'
import DryRunnerHand from '../DryRunnerHand'
import DryRunnerHeader from '../DryRunnerHeader'
import DryRunnerInfo from '../DryRunnerInfo'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import './index.css'

const DryRunner = props => (
  <>
    <h1 className='VisuallyHidden'>Deck Dry-run</h1>

    <Row desktopOnly wideGutter>
      <Column width={33}>
        <Title>Your deck</Title>
        <Deck
          deck={props.displayDeck}
          onClick={props.mode === 'MANUAL' ? props.onDeckCardClick : undefined}
          isCardDisabled={card => props.hand.includes(card.id)}
          highlightedCards={props.displayDeck
            .filter(card => !props.hand.includes(card.id))
            .map(card => card.id)}
        />

        <Row>
          <Column>
            <Checkbox
              name='display-chance'
              id='display-chance'
              checked={props.displayChance}
              onChange={event => props.setDisplayChance(event.target.checked)}
              data-testid='display-chance'
            >
              Display draw chance
            </Checkbox>
          </Column>
        </Row>
        <Row>
          <DryRunnerCardLog cards={props.playedCards} />
        </Row>
      </Column>

      <Column width={66}>
        <div className='DryRunner__main'>
          <Title>Your hand</Title>
          <DryRunnerHeader {...props} />
          <DryRunnerHand {...props} />
          <DryRunnerActions {...props} />
          <DryRunnerInfo {...props} />
        </div>
      </Column>
    </Row>

    <PageMeta
      title='Deck Dry-Run'
      description='Try your deck with actual in-game mechanisms to test mana flow.'
    />
  </>
)

export default DryRunner
