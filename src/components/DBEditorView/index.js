import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import cards from '../../data/cards'
import decks from '../../data/decks'
import hookIntoProps from '../../helpers/hookIntoProps'
import useViewportWidth from '../../helpers/useViewportWidth'
import PageMeta from '../PageMeta'
import Title from '../Title'
import Deck from '../Deck'
import Tags from '../Tags'
import Row from '../Row'
import Column from '../Column'
import DBFiltering from '../DBFiltering'
import ImportCollection from '../DBImportCollection'
import ResetButton from '../ResetButton'
import ShareButton from '../DBShareButton'
import CardsGallery from '../CardsGallery'
import EmptySearch from '../EmptySearch'
import Filters from '../DBEditorFilters'
import CardLevelField from '../DBCardLevelField'
import RandomDeckButton from '../DBRandomDeckButton'
import './index.css'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'

class DBEditorView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardLevel: 1,
      withCustomCollection: false,
      collection: cards,
      hasImported: null
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.captureKeyboardEvents)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.captureKeyboardEvents)
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

    const level = this.state.withCustomCollection
      ? this.state.collection.find(card => card.id === id).level
      : this.state.cardLevel

    this.props.addCardToDeck({ id, level })
  }

  isCardMissing = id =>
    this.state.collection.find(card => card.id === id).missing

  onCollectionImport = collection =>
    this.setState(
      {
        collection: collection || this.state.collection,
        hasImported: !!collection,
        withCustomCollection: true
      },
      () => {
        setTimeout(() => this.setState({ hasImported: null }), 3000)
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
    )

  render() {
    const matchedDeck = decks.find(deck => deck.id === this.props.deckId)
    const cardCollection = this.state.collection.map(card =>
      resolveCardForLevel({
        ...card,
        level: this.state.withCustomCollection
          ? card.level
          : this.state.cardLevel
      })
    )

    return (
      <Fragment>
        <h1 className="visually-hidden">Deck Builder</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Your deck</Title>

            <Deck
              id="deck"
              deck={this.props.deck}
              onClick={this.props.removeCardFromDeck}
              onClickLabel="Remove card from deck"
              highlightedCards={this.props.highlightedCards}
            />

            {this.props.deck.length > 0 && (
              <Fragment>
                <Row>
                  <Column>
                    <ResetButton
                      label="Reset deck"
                      confirm="Are you sure you want to reset your deck?"
                      reset={this.props.reset}
                    />
                  </Column>
                  <Column>
                    <ShareButton />
                  </Column>
                </Row>
              </Fragment>
            )}

            {matchedDeck ? (
              <p>
                This deck is named “{matchedDeck.name}” and has been made by{' '}
                {matchedDeck.author}.{' '}
                {matchedDeck.tags.length > 0 && (
                  <Fragment>
                    It is tagged as <Tags tags={matchedDeck.tags} />.
                  </Fragment>
                )}
              </p>
            ) : (
              <Fragment>
                <p>
                  If you do not know where to start,{' '}
                  <Link to="/deck/guide">read the guide</Link> to learn how to
                  make a viable deck, or try one of the{' '}
                  <Link to="/deck/suggestions">
                    ready-to-go suggested decks
                  </Link>
                  .
                </p>
              </Fragment>
            )}

            <RandomDeckButton
              defineDeck={this.props.defineDeck}
              collection={this.state.collection}
            />

            <Fragment>
              {!this.state.withCustomCollection && (
                <Fragment>
                  <p>
                    If you have already{' '}
                    <Link to="/deck/collection">created your collection</Link>,
                    you can import it directly in the deck builder to compose
                    decks that you can make in-game.
                  </p>
                  <ImportCollection onChange={this.onCollectionImport} />
                </Fragment>
              )}

              {this.state.hasImported !== null && (
                <p>
                  {this.state.hasImported
                    ? '✓ Your collection has been successfully imported!'
                    : '✘ Unfortunately their was an error importing your collection.'}
                </p>
              )}
            </Fragment>
          </Column>

          <Column width={66}>
            <div className="DB__collection">
              <Title>Cards collection</Title>

              <DBFiltering cards={cardCollection}>
                {({
                  filters,
                  filtersSetters,
                  collection,
                  resetFilters,
                  cardsPerPage
                }) => (
                  <Fragment>
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
                          this.state.withCustomCollection ? null : (
                            <CardLevelField
                              cardLevel={this.state.cardLevel}
                              setCardLevel={this.setCardLevel}
                            />
                          )
                        }
                      />
                    ) : (
                      <EmptySearch
                        title="No cards found"
                        resetFilters={resetFilters}
                      />
                    )}
                  </Fragment>
                )}
              </DBFiltering>
            </div>
          </Column>
        </Row>

        <PageMeta title="Deck Builder" description="Compose your own deck." />
      </Fragment>
    )
  }
}

export default hookIntoProps(() => ({ viewportWidth: useViewportWidth() }))(
  DBEditorView
)
