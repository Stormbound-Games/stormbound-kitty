import React from 'react'
import Card from '../Card'
import Checkbox from '../Checkbox'
import Column from '../Column'
import CTA from '../CTA'
import Deck from '../Deck'
import DeckMechanisms from '../DeckMechanisms'
import Hint from '../Hint'
import Mana from '../Mana'
import PageMeta from '../PageMeta'
import ResetButton from '../ResetButton'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default props => {
  const [equalsMode, setEqualsMode] = React.useState(false)
  const deck = equalsMode
    ? props.deck.map(card => ({ ...card, level: 1 }))
    : props.deck

  return (
    <DeckMechanisms deck={deck} mode='MANUAL'>
      {state => (
        <DeckBuilderTrackerView
          {...props}
          {...state}
          equalsMode={equalsMode}
          setEqualsMode={setEqualsMode}
        />
      )}
    </DeckMechanisms>
  )
}

const STATUSES = {
  PICKING_HAND: 'PICKING_HAND',
  PLAYING: 'PLAYING',
  PLAYING_FREEBOOTERS: 'PLAYING_FREEBOOTERS',
  PLAYING_SNAKE_EYES: 'PLAYING_SNAKE_EYES',
  PLAYING_GOLDGRUBBERS_REMOVING: 'PLAYING_GOLDGRUBBERS_REMOVING',
  PLAYING_GOLDGRUBBERS_DRAWING: 'PLAYING_GOLDGRUBBERS_DRAWING',
  PLAYING_FIRST_MUTINEER: 'PLAYING_FIRST_MUTINEER',
  PLAYING_QUEEN_OF_HERDS: 'PLAYING_QUEEN_OF_HERDS',
  CYCLING: 'CYCLING',
  REFILLING: 'REFILLING',
}

class DeckBuilderTrackerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCard: null,
      status: STATUSES.PICKING_HAND,
      // In order to start computing a reliable drawing chance, the card has to
      // be played or cycled at least once, hence maintaining an array of
      // untouched cards.
      untouchedCards: this.props.deck.map(card => card.id),
      // There is not really such thing as “cycling” given it cannot be random,
      // so this need to be maintained manually in this component as the one
      // coming from `DeckMechanisms` is always falsy.
      cycledCard: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.registerShortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerShortcuts)
  }

  registerShortcuts = event => {
    const E_KEY = 69
    const C_KEY = 67
    const P_KEY = 80
    const numKeys = [49, 50, 51, 52]
    const padKeys = [97, 98, 99, 100]

    switch (event.which) {
      case 49:
      case 50:
      case 51:
      case 52: {
        const index = numKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.state.status === STATUSES.PLAYING
          ? this.setState(state => ({
              activeCard: state.activeCard === card ? null : card,
            }))
          : undefined
      }
      case 97:
      case 98:
      case 99:
      case 100: {
        const index = padKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.state.status === STATUSES.PLAYING
          ? this.setState(state => ({
              activeCard: state.activeCard === card ? null : card,
            }))
          : undefined
      }
      case P_KEY: {
        return this.state.activeCard &&
          this.props.canCardBePlayed(this.state.activeCard)
          ? this.playCard()
          : undefined
      }
      case C_KEY: {
        return this.state.activeCard && !this.state.cycledCard
          ? this.cycleCard()
          : undefined
      }
      case E_KEY: {
        return this.endTurn()
      }
      default:
        return
    }
  }

  selectCard = id => {
    // If currently in remove allowance mode, discard the selected card, mark
    // it as touched and decrease the allowance by 1
    if (typeof this.state.removeAllowance === 'number') {
      this.props.play(id, { discard: true })
      this.touchCard(id)
      this.setState(
        state => ({
          removeAllowance: state.removeAllowance - 1 || null,
        }),
        () => {
          if (
            (this.state.status === STATUSES.PLAYING_ARCHDRUID_EARYN ||
              this.state.status === STATUSES.PLAYING_FIRST_MUTINEER) &&
            !this.state.removeAllowance
          ) {
            this.setState({ status: STATUSES.PLAYING })
          }
        }
      )

      if (this.state.status === STATUSES.PLAYING_GOLDGRUBBERS_REMOVING) {
        this.setState({
          status: STATUSES.PLAYING_GOLDGRUBBERS_DRAWING,
          refillAllowance: 1,
        })
      }
    } else {
      // If not in allowance mode, toggle the active state for the card
      this.setState(state => ({
        activeCard: state.activeCard === id ? null : id,
      }))
    }
  }

  cycleCard = () => {
    this.props.play(this.state.activeCard, { discard: true })
    this.touchCard(this.state.activeCard)
    this.setState({
      status: STATUSES.CYCLING,
      activeCard: null,
      cycledCard: this.state.activeCard,
    })
  }

  touchCard = id => {
    if (!this.state.untouchedCards.includes(id)) return

    this.setState(state => ({
      untouchedCards: state.untouchedCards.filter(cardId => cardId !== id),
    }))
  }

  playCard = () => {
    const { activeCard } = this.state
    const { level } = this.props.deck.find(card => card.id === activeCard)

    // Play the current card and mark is as touched so we can start tracking its
    // drawing probability
    this.props.play(this.state.activeCard)
    this.touchCard(this.state.activeCard)
    this.setState({ activeCard: null })

    // If the card is Snake Eyes, discard all cards from the hand, and allow to
    // refill 3 or 4 based on the level of Snake Eyes.
    if (activeCard === 'N33' /* Snake Eyes */ && this.props.hand.length === 4) {
      const cardsFromHand = [...this.props.hand]
      cardsFromHand
        .filter(card => card !== activeCard)
        .forEach(card => {
          this.props.play(card, { discard: true })
          this.touchCard(card)
        })

      return this.setState({
        refillAllowance: level >= 4 ? 4 : 3,
        status: STATUSES.PLAYING_SNAKE_EYES,
      })
    }

    // If the card is Freebooters, allow to refill 1 or 2 cards based on the
    // level of Freebooters and the amount of cards in hand.
    if (activeCard === 'N14' /* Freebooters */) {
      return this.setState({
        refillAllowance: level >= 4 && this.props.hand.length <= 3 ? 2 : 1,
        status: STATUSES.PLAYING_FREEBOOTERS,
      })
    }

    if (activeCard === 'N12' /* First Mutineer */) {
      const nonPirates = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).race !== 'pirate'
      )

      if (nonPirates.length > 0) {
        if (nonPirates.length === 1) {
          this.props.play(nonPirates[0], { discard: true })
          this.touchCard(nonPirates[0])

          return this.setState({ status: STATUSES.PLAYING })
        }

        return this.setState({
          removeAllowance: 1,
          status: STATUSES.PLAYING_FIRST_MUTINEER,
        })
      }
    }

    if (activeCard === 'N22' /* Goldgrubbers */) {
      const nonPirates = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).race !== 'pirate'
      )

      if (nonPirates.length > 0) {
        if (nonPirates.length === 1) {
          this.props.play(nonPirates[0], { discard: true })
          this.touchCard(nonPirates[0])

          return this.setState({
            refillAllowance: 1,
            status: STATUSES.PLAYING_GOLDGRUBBERS_DRAWING,
          })
        }

        return this.setState({
          removeAllowance: 1,
          status: STATUSES.PLAYING_GOLDGRUBBERS_REMOVING,
        })
      }
    }

    if (activeCard === 'S21' /* Queen of Herds */) {
      const inDrawPile = card => !this.props.hand.includes(card.id)
      const satyrs = this.props.deck
        .filter(inDrawPile)
        .filter(card => card.race === 'satyr')

      if (satyrs.length > 0) {
        if (satyrs.length === 1) {
          this.props.play(satyrs[0].id, { free: true })
          this.touchCard(satyrs[0].id)
          return
        }

        if (level >= 4 && satyrs.length === 2) {
          this.props.play(satyrs[0].id, { free: true })
          this.touchCard(satyrs[0].id)
          this.props.play(satyrs[1].id, { free: true })
          this.touchCard(satyrs[1].id)
          return
        }

        this.setState({
          playAllowance: level >= 4 ? 2 : 1,
          status: STATUSES.PLAYING_QUEEN_OF_HERDS,
        })
      }
    }

    if (activeCard === 'N48' /* Archdruid Earyn */) {
      const spells = this.props.hand.filter(
        cardId =>
          this.props.deck.find(card => card.id === cardId).type === 'spell'
      )

      if (spells.length > 0) {
        if (spells.length === 1) {
          this.props.play(spells[0], { free: true })
          this.touchCard(spells[0])
          return
        }

        if (level >= 4 && spells.length === 2) {
          this.props.play(spells[0], { free: true })
          this.touchCard(spells[0])
          this.props.play(spells[1], { free: true })
          this.touchCard(spells[1])
          return
        }

        return this.setState({
          removeAllowance: level >= 4 ? 2 : 1,
          status: STATUSES.PLAYING_ARCHDRUID_EARYN,
        })
      }
    }
  }

  resetGame = () => {
    this.props.reset()
    this.setState({
      activeCard: null,
      status: STATUSES.PICKING_HAND,
      untouchedCards: this.props.deck.map(card => card.id),
    })
  }

  getDisplayDeck = () => {
    const sum = this.props.deck
      .map(card => card.weight)
      .reduce((a, b) => a + b, 0)

    return this.props.deck.map(card => {
      const chance = ((card.weight / sum) * 100).toFixed(2)
      const name = `${card.name} ${
        this.props.hand.includes(card.id)
          ? '(in hand)'
          : this.state.untouchedCards.includes(card.id)
          ? '(?)'
          : `(${chance}%)`
      }`

      return { ...card, name }
    })
  }

  // Display order should be:
  // 1. Untouched cards in natural order
  // 2. Probability high to low
  // 3. Cards from hand in natural order
  sortDeckByProbability = (a, b) => {
    const isAInHand = this.props.hand.includes(a.id)
    const isBInHand = this.props.hand.includes(b.id)

    // If card A isn’t in hand, but card B is, put A first
    if (!isAInHand && isBInHand) return -1

    // If card A is in hand, but card B isn’t, put B first
    if (isAInHand && !isBInHand) return +1

    // If both cards are in hand, use usual comparison
    if (isAInHand && isBInHand) {
      if (+a.mana > +b.mana) return +1
      if (+a.mana < +b.mana) return -1
      if (a.name > b.name) return +1
      if (a.name < b.name) return -1
    }

    const hasABeenTouched = !this.state.untouchedCards.includes(a.id)
    const hasBBeenTouched = !this.state.untouchedCards.includes(b.id)

    // If card A has not been touched yet, but card B has, put B first
    if (!hasABeenTouched && hasBBeenTouched) return +1
    // If card A has been touched yet, but card B hasn’t, put A first
    if (hasABeenTouched && !hasBBeenTouched) return -1

    // If none of the cards have been touched yet, use usual comparison
    if (!hasABeenTouched && !hasBBeenTouched) {
      if (+a.mana > +b.mana) return +1
      if (+a.mana < +b.mana) return -1
      if (a.name > b.name) return +1
      if (a.name < b.name) return -1
    }

    // Otherwise compare by probability
    const sum = this.props.deck
      .map(card => card.weight)
      .reduce((a, b) => a + b, 0)
    const chanceA = (a.weight / sum) * 100
    const chanceB = (b.weight / sum) * 100

    if (chanceA > chanceB) return -1
    if (chanceA < chanceB) return +1

    return 0
  }

  endTurn = () => {
    this.props.endTurn()

    // Only enter the REFILLING status if the hand is not completed at the end
    // of the turn. This is likely to be the case, except if one cannot or does
    // not play any card on a given turn.
    if (this.props.hand.length !== 4) {
      this.setState({ status: STATUSES.REFILLING })
    }

    this.setState({
      activeCard: null,
      cycledCard: null,
    })
  }

  getHint = () => {
    switch (this.state.status) {
      case STATUSES.PICKING_HAND:
        return (
          <>
            Select the 4 cards that constitute your initial hand.
            {this.props.playerOrder === 'FIRST' &&
              'If you are the second player, check the “Second player” checkbox above.'}
          </>
        )
      case STATUSES.REFILLING:
        return 'You just ended your turn: select which card you drew.'
      case STATUSES.PLAYING_FREEBOOTERS:
        return 'You just played Freebooters: select which card(s) you drew.'
      case STATUSES.PLAYING_SNAKE_EYES:
        return 'You just played Snake Eyes: select the new cards you drew.'
      case STATUSES.PLAYING_FIRST_MUTINEER:
        return 'You just played First Mutineer: select which card got removed.'
      case STATUSES.PLAYING_GOLDGRUBBERS_REMOVING:
        return 'You just played Goldgrubbers with more than a single non-pirate in hand: select which card got removed.'
      case STATUSES.PLAYING_GOLDGRUBBERS_DRAWING:
        return 'You just played Goldgrubbers: select which card you drew.'
      case STATUSES.PLAYING_QUEEN_OF_HERDS:
        return 'You just played Queen of Herds with several satyrs in the deck: select which card(s) got played.'
      case STATUSES.PLAYING_ARCHDRUID_EARYN:
        return 'You just played Archdruid Earyn with several spells in your hand: select which card(s) got played.'
      case STATUSES.CYCLING:
        return 'You just cycled a card: select which card you drew.'
      case STATUSES.PLAYING:
        return 'Play your turn, then press “End turn”.'
      default:
        return 'The tracker appears to be in an unknown state. Please report.'
    }
  }

  onDeckCardClick = card => {
    switch (this.state.status) {
      // If defining the initial hand or refilling the hand at the end of a turn,
      // and currently with 3 cards in hand (therefore drawing the 4th), set the
      // status to `PLAYING`.
      case STATUSES.REFILLING:
      case STATUSES.PICKING_HAND: {
        this.props.draw(card.id)

        if (this.props.hand.length === 3) {
          this.setState({ status: STATUSES.PLAYING })
        }

        return
      }

      // If playing Queen of Herds, play the selected card for free and decrease
      // the play allowance by 1, and if no more allowance, restore the status to
      // `PLAYING`.
      case STATUSES.PLAYING_QUEEN_OF_HERDS: {
        this.props.play(card.id, { free: true })
        this.touchCard(card.id)

        return this.setState(
          state => ({
            playAllowance: state.playAllowance - 1 || null,
            status:
              state.playAllowance - 1 === 0 ? STATUSES.PLAYING : state.status,
          }),
          () => {
            if (this.state.status === STATUSES.PLAYING) {
              // @TODO: add deck weighing after Queen of Herds
              // this.props.getIncreasedDeckWeight({ set: true, reset: [card.id] })
            }
          }
        )
      }

      // When cycling, draw the card, increase the deck of the weight except for
      // the cycled and drawn cards which see their weight resetted, and resume
      // the status to `PLAYING`.
      case STATUSES.CYCLING: {
        this.props.draw(card.id)
        this.props.increaseDeckWeight({
          reset: [this.state.cycledCard, card.id],
        })
        return this.setState({ status: STATUSES.PLAYING })
      }

      default: {
        this.props.draw(card.id)

        if (typeof this.state.refillAllowance === 'number') {
          this.setState(state => ({
            refillAllowance: state.refillAllowance - 1 || null,
            status:
              state.refillAllowance - 1 === 0 || this.props.hand.length === 4
                ? STATUSES.PLAYING
                : state.status,
          }))
        }
      }
    }
  }

  isDeckCardDisabled = card => {
    if (this.state.status === STATUSES.PLAYING_QUEEN_OF_HERDS) {
      return card.race !== 'satyr'
    }

    return this.props.hand.includes(card.id) || !!this.state.removeAllowance
  }

  render() {
    return (
      <>
        <h1 className='VisuallyHidden'>Deck Tracker</h1>

        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Title>Your deck</Title>
            <Deck
              deck={this.getDisplayDeck()}
              sort={this.sortDeckByProbability}
              highlightedCards={this.props.deck
                .filter(card => !this.props.hand.includes(card.id))
                .map(card => card.id)}
              onClick={this.onDeckCardClick}
              isCardDisabled={this.isDeckCardDisabled}
            />

            <p>
              This tracker can be used alongside an actual game on another
              device to get real-time drawing chances estimation once every card
              has been played/cycled at least once.
            </p>

            <ol className='DeckBuilderTrackerView__list'>
              <li>Define your starting hand when the game begins.</li>
              <li>Play cards and/or cycle and refill your hand every turn.</li>
              <li>Check the drawing chances in the deck.</li>
            </ol>

            <p>
              Due to the lack of opponent’s deck, Harvester of Souls’ ability
              has not been implemented and might yield falsy results.
            </p>
          </Column>

          <Column width='2/3'>
            <div className='DeckBuilderTrackerView__hand'>
              <Title>
                {(() => {
                  switch (this.state.status) {
                    case STATUSES.PICKING_HAND:
                      return 'Define your starting hand'
                    case STATUSES.REFILLING:
                      return 'Refill your hand'
                    case STATUSES.PLAYING_FREEBOOTERS:
                      return 'Finish playing Freebooters'
                    case STATUSES.PLAYING_SNAKE_EYES:
                      return 'Finish playing Snake Eyes'
                    case STATUSES.PLAYING_GOLDGRUBBERS_DRAWING:
                    case STATUSES.PLAYING_GOLDGRUBBERS_REMOVING:
                      return 'Finish playing Goldgrubbers'
                    case STATUSES.PLAYING_QUEEN_OF_HERDS:
                      return 'Finish playing Queen of Herds'
                    case STATUSES.PLAYING_ARCHDRUID_EARYN:
                      return 'Finish playing Archdruid Earyn'
                    case STATUSES.CYCLING:
                      return 'Finish cycling'
                    case STATUSES.PLAYING:
                      return 'Play your turn'
                    default:
                      return 'Unknown state'
                  }
                })()}
              </Title>

              <div className='DeckBuilderTrackerView__board'>
                <Row>
                  <Column width='1/3' style={{ alignItems: 'center' }}>
                    <span className='DeckBuilderTrackerView__mana'>
                      <div>
                        Current mana:{' '}
                        <Mana
                          mana={this.props.mana}
                          disabled={this.props.hand.every(
                            cardId => !this.props.canCardBePlayed(cardId)
                          )}
                        />
                      </div>
                      <Checkbox
                        name='second-player'
                        id='second-player'
                        checked={this.props.playerOrder === 'SECOND'}
                        disabled={this.state.untouchedCards.length !== 12}
                        onChange={() =>
                          this.props.setPlayerOrder(
                            this.props.playerOrder === 'FIRST'
                              ? 'SECOND'
                              : 'FIRST'
                          )
                        }
                      >
                        Second player
                      </Checkbox>
                    </span>
                  </Column>

                  <Column width='1/3' style={{ alignItems: 'center' }}>
                    <ResetButton
                      label='Reset game'
                      confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
                      reset={this.resetGame}
                    >
                      <div className='DeckBuilderTrackerView__reset-checkbox'>
                        <Checkbox
                          name='equals-mode'
                          id='equals-mode'
                          checked={this.props.equalsMode}
                          onChange={() => this.props.setEqualsMode(s => !s)}
                        >
                          Reset in equal levels
                        </Checkbox>
                      </div>
                    </ResetButton>
                  </Column>

                  <Column width='1/3' style={{ alignItems: 'center' }}>
                    <CTA
                      type='button'
                      onClick={this.endTurn}
                      disabled={this.state.status !== STATUSES.PLAYING}
                    >
                      <u>E</u>nd turn
                    </CTA>
                  </Column>
                </Row>
              </div>

              <Row>
                {this.props.hand.map(cardId => {
                  const cardData = this.props.deck.find(
                    card => card.id === cardId
                  )

                  return (
                    <Column key={cardId} width='1/4'>
                      <div className='DeckBuilderTrackerView__column'>
                        <div
                          className={[
                            'DeckBuilderTrackerView__card-wrapper',
                            this.state.activeCard === cardId &&
                              'DeckBuilderTrackerView__card-wrapper--active',
                            !!this.state.activeCard &&
                              this.state.activeCard !== cardId &&
                              'DeckBuilderTrackerView__card-wrapper--inactive',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <button
                            className='DeckBuilderTrackerView__card-button'
                            type='button'
                            disabled={
                              ![
                                STATUSES.PLAYING,
                                STATUSES.PLAYING_FIRST_MUTINEER,
                                STATUSES.PLAYING_GOLDGRUBBERS_REMOVING,
                                STATUSES.PLAYING_ARCHDRUID_EARYN,
                              ].includes(this.state.status) ||
                              (this.state.status ===
                                STATUSES.PLAYING_FIRST_MUTINEER &&
                                cardData.race === 'pirate') ||
                              (this.state.status ===
                                STATUSES.PLAYING_GOLDGRUBBERS_REMOVING &&
                                cardData.race === 'pirate') ||
                              (this.state.status ===
                                STATUSES.PLAYING_ARCHDRUID_EARYN &&
                                cardData.type !== 'spell')
                            }
                            onClick={() => this.selectCard(cardId)}
                          >
                            <span className='VisuallyHidden'>
                              {this.state.activeCard === cardId
                                ? 'Unselect card'
                                : 'Select card'}
                            </span>
                          </button>
                          <Card
                            {...cardData}
                            affordable={
                              this.state.status === STATUSES.PLAYING &&
                              this.props.canCardBePlayed(cardId)
                            }
                          />
                        </div>
                      </div>
                    </Column>
                  )
                })}
              </Row>

              <div className='DeckBuilderTrackerView__hint'>
                <Hint>{this.getHint()}</Hint>
              </div>

              {this.state.activeCard && (
                <div className='DeckBuilderTrackerView__buttons'>
                  <Row>
                    <Column>
                      <CTA
                        type='button'
                        onClick={this.cycleCard}
                        disabled={
                          this.state.status !== STATUSES.PLAYING ||
                          !this.state.activeCard ||
                          !!this.state.cycledCard
                        }
                      >
                        <u>C</u>ycle card
                      </CTA>
                    </Column>
                    <Column style={{ alignItems: 'flex-end' }}>
                      <CTA
                        type='button'
                        onClick={this.playCard}
                        disabled={
                          this.state.status !== STATUSES.PLAYING ||
                          !this.state.activeCard ||
                          !this.props.canCardBePlayed(this.state.activeCard)
                        }
                      >
                        <u>P</u>lay card
                      </CTA>
                    </Column>
                  </Row>
                </div>
              )}
            </div>
          </Column>
        </Row>

        <PageMeta
          title='Deck tracker'
          description='Track your deck as you play to maximise your chances of winning.'
        />
      </>
    )
  }
}
