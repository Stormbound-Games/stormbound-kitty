import React from 'react'
import Link from '../Link'
import DryRunnerCardLog from '../DryRunnerCardLog'
import Deck from '../Deck'
import DryRunnerActions from '../DryRunnerActions'
import DryRunnerHand from '../DryRunnerHand'
import DryRunnerHeader from '../DryRunnerHeader'
import DryRunnerInfo from '../DryRunnerInfo'
import HarvestersDialog from '../HarvestersDialog'
import Info from '../Info'
import Only from '../Only'
import Page from '../Page'
import Row from '../Row'
import Title from '../Title'
import isCard from '../../helpers/isCard'
import useViewportSize from '../../hooks/useViewportSize'

export default React.memo(function DryRunner(props) {
  const { viewportWidth } = useViewportSize()

  return (
    <Page
      title='Deck Dry-Run'
      description='Try your deck with actual in-game mechanisms to test its mana curve and the likelihood of having cards combos'
      action={{ to: '/deck/' + props.deckId, children: 'Edit deck' }}
    >
      <Row isDesktopOnly withWideGutter>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck
            deck={props.displayDeck}
            orientation={viewportWidth > 700 ? 'vertical' : 'horizontal'}
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
          <Only.Desktop>
            <Info icon='sword' title='In-game mechanics'>
              <p>
                This simulator has same{' '}
                <Link to='/guides/drawing'>drawing/cycling mechanics</Link> as
                the game and should be an accurate representation of how playing
                your deck would feel. It can be useful to evaluate card cycling,
                mana flow and combo efficiency. Additionally,{' '}
                <Link to={{ pathname: '/faq', hash: '#dry-runner-mechanics' }}>
                  many card abilities
                </Link>{' '}
                are also implemented in this simulator.
              </p>
            </Info>
          </Only.Desktop>

          {props.deck.map(card => card.id).includes('N38') && (
            <HarvestersDialog
              {...props.HoS}
              addCardToDeck={props.addCardToDeck}
            />
          )}
        </Row.Column>

        <Row.Column width='2/3'>
          <Title>Your hand</Title>
          <DryRunnerHeader {...props} />
          <DryRunnerHand {...props} />
          <DryRunnerActions {...props} />
          <DryRunnerInfo {...props} />
        </Row.Column>
      </Row>
    </Page>
  )
})
