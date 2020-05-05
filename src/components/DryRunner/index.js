import React from 'react'
import { Link } from 'react-router-dom'
import DryRunnerCardLog from '../DryRunnerCardLog'
import Column from '../Column'
import Deck from '../Deck'
import DryRunnerActions from '../DryRunnerActions'
import DryRunnerHand from '../DryRunnerHand'
import DryRunnerHeader from '../DryRunnerHeader'
import DryRunnerInfo from '../DryRunnerInfo'
import HarvestersDialog from '../HarvestersDialog'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import isCard from '../../helpers/isCard'

export default React.memo(function DryRunner(props) {
  return (
    <>
      <h1 className='VisuallyHidden'>Deck Dry-run</h1>

      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>Your deck</Title>
          <Deck
            deck={props.displayDeck}
            onClick={
              props.mode === 'MANUAL' ? props.onDeckCardClick : undefined
            }
            isCardDisabled={card => props.hand.find(isCard(card))}
            highlightedCards={props.displayDeck.filter(
              card => !props.hand.find(isCard(card))
            )}
          />

          <DryRunnerCardLog
            cards={props.playedCards}
            cardsThisTurn={props.cardsThisTurn}
          />

          <Info icon='sword' title='In-game mechanics'>
            This simulator has same{' '}
            <Link to='/faq#drawing-algorithm'>drawing/cycling mechanics</Link>{' '}
            as the game and should be an accurate representation of how playing
            your deck would feel. It can be useful to evaluate card cycling,
            mana flow and combo efficiency. Additionally,{' '}
            <Link to='/faq#dry-runner-mechanics'>many card abilities</Link> are
            also implemented in this simulator.
          </Info>

          {props.deck.map(card => card.id).includes('N38') && (
            <>
              <HarvestersDialog
                {...props.HoS}
                addCardToDeck={props.addCardToDeck}
              />
              <Info icon='sword' title='Harvesters of Souls'>
                Due to the lack of opponent’s deck, Harvesters of Souls’ ability
                has only been partially implemented.
              </Info>
            </>
          )}
        </Column>

        <Column width='2/3'>
          <Title>Your hand</Title>
          <DryRunnerHeader {...props} />
          <DryRunnerHand {...props} />
          <DryRunnerActions {...props} />
          <DryRunnerInfo {...props} />
        </Column>
      </Row>

      <PageMeta
        title='Deck Dry-Run'
        description='Try your deck with actual in-game mechanisms to test its mana curve and the likelihood of having cards combos'
      />
    </>
  )
})
