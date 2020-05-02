import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import { NotificationContext } from '../NotificationProvider'
import CollectionClearHint from '../CollectionClearHint'
import CardLevelField from '../DeckBuilderCardLevelField'
import CardsGallery from '../CardsGallery'
import Column from '../Column'
import Deck from '../Deck'
import EmptySearch from '../EmptySearch'
import CardsFiltering from '../CardsFiltering'
import Filters from '../DeckBuilderEditorFilters'
import ImportCollection from '../ImportCollection'
import Only from '../Only'
import PageMeta from '../PageMeta'
import RandomDeckButton from '../DeckBuilderRandomDeckButton'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../DeckBuilderShareButton'
import Title from '../Title'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import getRawCardData from '../../helpers/getRawCardData'
import sortByMana from '../../helpers/sortByMana'
import { deserialiseDeck } from '../../helpers/deserialise'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

class DeckBuilderEditorView extends React.Component {
  state = { cardLevel: 1 }

  componentDidMount() {
    document.addEventListener('keydown', this.captureKeyboardEvents)

    if (this.props.deckId && !this.props.hasDefaultCollection) {
      this.adjustDeckToCollection(this.props.collection)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.captureKeyboardEvents)
  }

  adjustDeckToCollection(collection) {
    this.props.deck.forEach(cardInDeck => {
      const cardInCollection = collection.find(
        cardInCollection => cardInCollection.id === cardInDeck.id
      )

      if (cardInCollection.missing) {
        this.props.removeCardFromDeck({ id: cardInDeck.id })
      } else if (cardInCollection.level !== cardInDeck.level) {
        this.addCardToDeck(cardInDeck.id)
      }
    })
  }

  captureKeyboardEvents = event => {
    const key = event.which
    const keys = [49, 50, 51, 52, 53]
    const padKeys = [97, 98, 99, 100, 101]

    if (keys.includes(key) || padKeys.includes(key)) {
      const level = Math.max(keys.indexOf(key), padKeys.indexOf(key))
      this.setCardLevel(level + 1)
    }
  }

  setCardLevel = cardLevel => this.setState({ cardLevel })

  addCardToDeck = id => {
    if (this.isCardMissing(id)) {
      return
    }

    const level = !this.props.hasDefaultCollection
      ? this.props.collection.find(card => card.id === id).level
      : this.state.cardLevel

    this.props.addCardToDeck({ id, level })
  }

  isCardMissing = id =>
    this.props.collection.find(card => card.id === id).missing

  onCollectionImport = collection => {
    if (!collection) return

    this.adjustDeckToCollection(collection)
  }

  isSuggestedDeck = () => {
    const deckCards = this.props.deck.map(card => card.id)

    return decks.find(deck => {
      return deserialiseDeck(deck.id).every(card => deckCards.includes(card.id))
    })
  }

  getDeckDescription = () => {
    if (this.props.deck.length < 12) {
      return 'Compose your own deck.'
    }

    return this.props.deck
      .slice(0)
      .sort(sortByMana)
      .map(card => {
        return `${getRawCardData(card.id).name} (${card.level})`
      })
      .join(', ')
  }

  render() {
    const matchedDeck = this.isSuggestedDeck()
    const cardCollection = this.props.collection.map(card =>
      resolveCardForLevel({
        ...card,
        level: !this.props.hasDefaultCollection
          ? card.level
          : this.state.cardLevel,
      })
    )

    return (
      <>
        <h1 className='VisuallyHidden'>Deck Builder</h1>

        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Title>{matchedDeck ? matchedDeck.name : 'Your deck'}</Title>
            {matchedDeck && (
              <span className='DeckBuilderEditorView__subtitle'>
                (by{' '}
                <Link to={`/member/${matchedDeck.author}`}>
                  {matchedDeck.author}
                </Link>
                )
              </span>
            )}

            <Deck
              showUpgrades
              id='deck'
              deck={this.props.deck}
              onClick={this.props.removeCardFromDeck}
              onClickLabel='Remove card from deck'
              highlightedCards={this.props.highlightedCards}
            />

            {this.props.deck.length > 0 && (
              <>
                <Row>
                  <Column>
                    <ResetButton
                      label='Reset deck'
                      confirm='Are you sure you want to reset your deck?'
                      reset={this.props.reset}
                    />
                  </Column>
                  <Column>
                    <ShareButton />
                  </Column>
                </Row>
              </>
            )}

            {!this.state.matchedDeck && (
              <div className='DeckBuilderEditorView__info'>
                <p>
                  If you do not know where to start,{' '}
                  <Link to='/guides/deck'>read the deck-building guide</Link> to
                  learn how to make a viable deck, or try one of the{' '}
                  <Link to='/deck/suggestions'>
                    ready-to-go suggested decks
                  </Link>
                  .
                </p>

                <CollectionClearHint />

                <Only.DefaultCollection>
                  <p>
                    If you have already{' '}
                    <Link to='/collection'>created your collection</Link>, you
                    can import it directly in the deck builder to compose decks
                    that you can make in-game.
                  </p>
                </Only.DefaultCollection>
              </div>
            )}

            {(!matchedDeck || this.props.hasDefaultCollection) && (
              <Row>
                <Column>
                  {!matchedDeck ? (
                    <RandomDeckButton defineDeck={this.props.defineDeck} />
                  ) : (
                    <ImportCollection onChange={this.onCollectionImport} />
                  )}
                </Column>
                <Column>
                  <Only.DefaultCollection>
                    {!matchedDeck && (
                      <ImportCollection onChange={this.onCollectionImport} />
                    )}
                  </Only.DefaultCollection>
                </Column>
              </Row>
            )}
          </Column>

          <Column width='2/3'>
            <div className='DB__collection'>
              <Title>Cards</Title>

              <CardsFiltering cards={cardCollection}>
                {({
                  filters,
                  filtersSetters,
                  collection,
                  resetFilters,
                  cardsPerPage,
                }) => (
                  <>
                    <Filters
                      {...filters}
                      {...filtersSetters}
                      resetFilters={resetFilters}
                    />

                    {collection.length > 0 ? (
                      <CardsGallery
                        filters={filters}
                        cards={collection}
                        onCardClick={this.addCardToDeck}
                        cardsPerPage={cardsPerPage}
                        isCardInDeck={id =>
                          this.props.deck.map(card => card.id).includes(id)
                        }
                        isCardMissing={this.isCardMissing}
                        navChildren={
                          <Only.DefaultCollection>
                            <CardLevelField
                              cardLevel={this.state.cardLevel}
                              setCardLevel={this.setCardLevel}
                            />
                          </Only.DefaultCollection>
                        }
                      />
                    ) : (
                      <EmptySearch
                        title='No cards found'
                        resetFilters={resetFilters}
                      />
                    )}
                  </>
                )}
              </CardsFiltering>
            </div>
          </Column>
        </Row>

        <PageMeta
          title='Deck Builder'
          description={this.getDeckDescription()}
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  ...React.useContext(CollectionContext),
  ...React.useContext(NotificationContext),
  viewportWidth: useViewportWidth(),
  deckId: useRouteMatch().params.deckId,
}))(props => <DeckBuilderEditorView {...props} />)
