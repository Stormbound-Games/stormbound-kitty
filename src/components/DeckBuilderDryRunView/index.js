import React from 'react'
import { Link } from 'react-router-dom'
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
import RNGField from '../DeckBuilderRNGField'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import './index.css'

export default props => {
  const [equalsMode, setEqualsMode] = React.useState(false)
  const deck = equalsMode
    ? props.deck.map(card => ({ ...card, level: 1 }))
    : props.deck

  return (
    <DeckMechanisms deck={deck}>
      {state => (
        <DeckBuilderDryRunView
          {...props}
          {...state}
          equalsMode={equalsMode}
          setEqualsMode={setEqualsMode}
        />
      )}
    </DeckMechanisms>
  )
}

class DeckBuilderDryRunView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeCard: null,
      turnsWithLeftOverMana: 0,
      turnsWithoutCycling: 0,
      totalUnspentMana: 0,
      totalCardsPlayed: 0,
      displayChance: false,
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

        return this.selectCard(card)
      }
      case 97:
      case 98:
      case 99:
      case 100: {
        const index = padKeys.indexOf(event.which)
        const card = this.props.hand[index]

        return this.selectCard(card)
      }
      case P_KEY: {
        return this.state.activeCard &&
          this.props.canCardBePlayed(this.state.activeCard)
          ? this.playCard()
          : undefined
      }
      case C_KEY: {
        return this.state.activeCard && !this.props.hasCycledThisTurn
          ? this.cycleCard()
          : undefined
      }
      case E_KEY: {
        return this.props.endTurn()
      }
      default:
        return
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.turn < this.props.turn) {
      this.setState(state => ({
        totalUnspentMana: state.totalUnspentMana + prevProps.mana,
      }))

      if (prevProps.mana) {
        this.setState(state => ({
          turnsWithLeftOverMana: state.turnsWithLeftOverMana + 1,
        }))
      }

      if (!prevProps.hasCycledThisTurn) {
        this.setState(state => ({
          turnsWithoutCycling: state.turnsWithoutCycling + 1,
        }))
      }
    }
  }

  selectCard = id => {
    this.setState(state => ({
      activeCard: state.activeCard === id ? null : id,
    }))
  }

  cycleCard = () => {
    this.props.cycle(this.state.activeCard)
    this.setState({ activeCard: null })
  }

  playCard = () => {
    this.props.play(this.state.activeCard)
    this.setState(state => ({
      totalCardsPlayed: state.totalCardsPlayed + 1,
      activeCard: null,
    }))
  }

  resetGame = () => {
    this.props.reset()
    this.setState({
      activeCard: null,
      turnsWithLeftOverMana: 0,
      turnsWithoutCycling: 0,
      totalUnspentMana: 0,
      totalCardsPlayed: 0,
    })
  }

  getDisplayDeck = () => {
    const sum = this.props.deck
      .map(card => card.weight)
      .reduce((a, b) => a + b, 0)

    return this.props.deck.map(card => {
      const chance = ((card.weight / sum) * 100).toFixed(2)
      const name = this.state.displayChance
        ? `${card.name} (${
            this.props.hand.includes(card.id) ? 'in hand' : `${chance}%`
          })`
        : card.name

      return { ...card, name }
    })
  }

  getFrozenCoreText = () => {
    const { activeFrozenCores } = this.props.specifics
    return (
      <>
        There {activeFrozenCores === 1 ? 'is' : 'are'}{' '}
        {activeFrozenCores ? activeFrozenCores : 'no'}{' '}
        <WikiLink id='W9'>
          Frozen {activeFrozenCores === 1 ? 'Core' : 'Cores'}
        </WikiLink>{' '}
        on the board.
      </>
    )
  }

  getDawnsparksText = () => {
    const { activeDawnsparks } = this.props.specifics
    return (
      <>
        There {activeDawnsparks === 1 ? 'is' : 'are'}{' '}
        {activeDawnsparks ? activeDawnsparks : 'no'}{' '}
        <WikiLink id='W16'>Dawnsparks</WikiLink>{' '}
        {activeDawnsparks === 0
          ? ''
          : activeDawnsparks === 1
          ? 'unit '
          : 'units '}
        on the board.
      </>
    )
  }

  render() {
    return (
      <>
        <h1 className='VisuallyHidden'>Deck Dry-run</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Your deck</Title>
            <Deck deck={this.getDisplayDeck()} />

            <Row>
              <Column>
                <Checkbox
                  name='display-chance'
                  id='display-chance'
                  checked={this.state.displayChance}
                  onChange={() =>
                    this.setState(state => ({
                      displayChance: !state.displayChance,
                    }))
                  }
                  data-testid='display-chance'
                >
                  Display draw chance
                </Checkbox>
              </Column>
            </Row>
          </Column>

          <Column width={66}>
            <div className='DeckBuilderDryRunView__hand'>
              <Title>Your hand</Title>

              <div className='DeckBuilderDryRunView__board'>
                <Row>
                  <Column width={33}>
                    <span className='DeckBuilderDryRunView__mana'>
                      Current mana:{' '}
                      <Mana
                        mana={this.props.mana}
                        data-testid='mana-pool'
                        disabled={this.props.hand.every(
                          cardId => !this.props.canCardBePlayed(cardId)
                        )}
                      />
                    </span>
                  </Column>

                  <Column width={33}>
                    <ResetButton
                      label='Reset game'
                      confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
                      reset={this.resetGame}
                    >
                      <div className='DeckBuilderDryRunView__reset-checkbox'>
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

                  <Column width={33}>
                    <CTA
                      type='button'
                      data-testid='end-turn-btn'
                      onClick={this.props.endTurn}
                    >
                      <u>E</u>nd turn
                    </CTA>
                  </Column>
                </Row>
              </div>

              <Row data-testid='hand'>
                {this.props.hand.map(cardId => {
                  const cardData = this.props.deck.find(
                    card => card.id === cardId
                  )

                  return (
                    <Column key={cardId} width={25}>
                      <div className='DeckBuilderDryRunView__column'>
                        <div
                          className={[
                            'DeckBuilderDryRunView__card-wrapper',
                            this.state.activeCard === cardId &&
                              'DeckBuilderDryRunView__card-wrapper--active',
                            !!this.state.activeCard &&
                              this.state.activeCard !== cardId &&
                              'DeckBuilderDryRunView__card-wrapper--inactive',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <button
                            className='DeckBuilderDryRunView__card-button'
                            type='button'
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
                            affordable={this.props.canCardBePlayed(cardId)}
                          />
                        </div>
                      </div>
                    </Column>
                  )
                })}
              </Row>

              {this.state.activeCard && (
                <div className='DeckBuilderDryRunView__buttons'>
                  <Row>
                    <Column>
                      <CTA
                        type='button'
                        data-testid='cycle-btn'
                        onClick={this.cycleCard}
                        disabled={
                          !this.state.activeCard || this.props.hasCycledThisTurn
                        }
                      >
                        <u>C</u>ycle card
                      </CTA>
                    </Column>
                    <Column style={{ alignItems: 'flex-end' }}>
                      <CTA
                        type='button'
                        data-testid='play-btn'
                        onClick={this.playCard}
                        disabled={
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

              <div className='DeckBuilderDryRunView__info'>
                <Row desktopOnly>
                  <Column>
                    <Title>What is this</Title>
                    <p>
                      This simulator has same drawing/cycling mechanics as the
                      game and should be an accurate representation of mana flow
                      for your deck.
                    </p>

                    <p>
                      It also takes into account <WikiLink id='N8' />,{' '}
                      <WikiLink id='N12' />, <WikiLink id='N14' />,{' '}
                      <WikiLink id='N22' />, <WikiLink id='N33' />,{' '}
                      <WikiLink id='N48' />, <WikiLink id='W10' />,{' '}
                      <WikiLink id='W12' />, and <WikiLink id='W19' />{' '}
                      abilities, RNG for <WikiLink id='S3' />,{' '}
                      <WikiLink id='W9' /> and <WikiLink id='W16' /> as well as
                      cards than cannot actually be played in the first turn
                      (e.g. <WikiLink id='F4' />, <WikiLink id='W1' />
                      …).
                    </p>

                    <p>
                      Learn more about{' '}
                      <Link to='/faq#dry-runner-works'>
                        how the dry-runner works
                      </Link>{' '}
                      and{' '}
                      <Link to='/faq#drawing-algorithm'>
                        what is the drawing algorithm
                      </Link>
                      .
                    </p>

                    {this.props.deck.map(card => card.id).includes('N38') && (
                      <Hint>
                        Due to the lack of opponent’s deck, Harvester of Souls’
                        ability has not been implemented.
                      </Hint>
                    )}

                    <RNGField
                      RNG={this.props.RNG}
                      setRNG={this.props.setRNG}
                      deck={this.props.deck}
                    />
                  </Column>

                  <Column>
                    <Title>Statistics</Title>

                    {this.props.turn === 1 ? (
                      <p>
                        Statistics will start showing up at the beginning of the
                        next turn.
                      </p>
                    ) : (
                      <>
                        <p>
                          It has been {this.props.turn} turns, during which
                          you’ve played {this.state.totalCardsPlayed} cards
                          (about{' '}
                          {(
                            this.state.totalCardsPlayed / this.props.turn
                          ).toFixed(2)}{' '}
                          cards per turn).
                        </p>
                        <p>
                          Of these turns, {this.state.turnsWithLeftOverMana} of
                          them left you with some unused mana, for a total of{' '}
                          {this.state.totalUnspentMana} unspent mana{' '}
                          {this.state.totalUnspentMana === 1
                            ? 'point'
                            : 'points'}{' '}
                          in the game.
                        </p>
                        <p>
                          You’ve willingly not cycled a card on{' '}
                          {this.state.turnsWithoutCycling}{' '}
                          {this.state.turnsWithoutCycling === 1
                            ? 'turn'
                            : 'turns'}
                          .
                        </p>
                        <p>
                          {this.props.deck
                            .map(card => card.id === 'W9')
                            .filter(Boolean).length
                            ? this.getFrozenCoreText()
                            : null}
                          <br />
                          {this.props.deck
                            .map(card => card.id === 'W16')
                            .filter(Boolean).length
                            ? this.getDawnsparksText()
                            : null}
                        </p>
                      </>
                    )}
                  </Column>
                </Row>
              </div>
            </div>
          </Column>
        </Row>

        <PageMeta
          title='Deck Dry-Run'
          description='Try your deck with actual in-game mechanisms to test mana flow.'
        />
      </>
    )
  }
}
