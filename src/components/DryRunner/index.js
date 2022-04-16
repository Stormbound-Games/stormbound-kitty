import React from 'react'
import Link from '~/components/Link'
import DryRunnerCardLog from '~/components/DryRunnerCardLog'
import Deck from '~/components/Deck'
import DryRunnerActions from '~/components/DryRunnerActions'
import DryRunnerHand from '~/components/DryRunnerHand'
import DryRunnerHeader from '~/components/DryRunnerHeader'
import DryRunnerInfo from '~/components/DryRunnerInfo'
import HarvestersDialog from '~/components/HarvestersDialog'
import Info from '~/components/Info'
import Only from '~/components/Only'
import Page from '~/components/Page'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import isCard from '~/helpers/isCard'

export default React.memo(function DryRunner(props) {
  return (
    <Page
      title='Deck Dry-Run'
      description='Try your deck with actual in-game mechanisms to test its mana curve and the likelihood of having cards combos'
      action={{ to: '/deck/' + props.deckId, children: 'Edit deck' }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck
            deck={props.displayDeck}
            orientation='vertical'
            onClick={props.onDeckCardClick}
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
                <Link to='/drawing-mechanics'>drawing/cycling mechanics</Link>{' '}
                as the game and should be an accurate representation of how
                playing your deck would feel. It can be useful to evaluate card
                cycling, mana flow and combo efficiency. Additionally,{' '}
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
          <Spacing bottom='LARGEST'>
            <DryRunnerHand {...props} />
            <DryRunnerActions {...props} />
          </Spacing>
          <DryRunnerInfo {...props} />
        </Row.Column>
      </Row>
    </Page>
  )
})
