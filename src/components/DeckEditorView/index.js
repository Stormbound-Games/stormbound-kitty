import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import { CollectionContext } from '../CollectionProvider'
import { NotificationContext } from '../NotificationProvider'
import CollectionClearHint from '../CollectionClearHint'
import CardLevelField from '../DeckCardLevelField'
import CardsFiltering from '../CardsFiltering'
import CardsGallery from '../CardsGallery'
import Column from '../Column'
import Deck from '../Deck'
import EmptySearch from '../EmptySearch'
import Filters from '../DeckEditorFilters'
import ImportCollection from '../ImportCollection'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import Only from '../Only'
import PageMeta from '../PageMeta'
import RandomDeckButton from '../RandomDeckButton'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../DeckShareButton'
import Title from '../Title'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isSuggestedDeck from '../../helpers/isSuggestedDeck'
import modifyDeck from '../../helpers/modifyDeck'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

class DeckEditorView extends React.Component {
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

  render() {
    const matchedDeck = isSuggestedDeck(this.props.deck)
    const cardCollection = this.props.collection.map(card =>
      getResolvedCardData({
        ...card,
        level: !this.props.hasDefaultCollection
          ? card.level
          : this.state.cardLevel,
      })
    )
    const deck =
      matchedDeck && matchedDeck.brawl
        ? modifyDeck(this.props.deck, matchedDeck.brawl)
        : this.props.deck

    return (
      <>
        <h1 className='VisuallyHidden'>Deck Builder</h1>

        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Title>{matchedDeck ? matchedDeck.name : 'Your deck'}</Title>
            {matchedDeck && (
              <span className='DeckEditorView__subtitle'>
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
              deck={deck}
              orientation={
                this.props.viewportWidth >= 700 ? 'vertical' : 'horizontal'
              }
              onClick={this.props.removeCardFromDeck}
              onClickLabel='Remove card from deck'
              highlightedCards={this.props.highlightedCards}
            />

            {deck.length > 0 ? (
              <div className='DeckEditorView__actions'>
                {' '}
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
              </div>
            ) : (
              <Info
                icon='stack'
                title='Getting started'
                CTA={<RandomDeckButton defineDeck={this.props.defineDeck} />}
              >
                If you do not know where to start,{' '}
                <Link to='/guides/deck'>read the deck-building guide</Link> to
                learn how to make a viable deck, or try one of the{' '}
                <Link to='/deck/suggestions'>ready-to-go suggested decks</Link>.
              </Info>
            )}

            <Only.Desktop>
              <CollectionClearHint />

              <Only.DefaultCollection>
                <Info
                  icon='books'
                  title={
                    <>
                      Your collection
                      <LearnMoreIcon anchor='#collection-benefits' />
                    </>
                  }
                  CTA={<ImportCollection onChange={this.onCollectionImport} />}
                >
                  If you have already created your collection, you can import it
                  directly in the deck builder to compose decks that you can
                  make in-game.
                </Info>
              </Only.DefaultCollection>
            </Only.Desktop>
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
                          deck.map(card => card.id).includes(id)
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

        <PageMeta {...getDeckBuilderMetaTags(deck)} />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  ...React.useContext(CollectionContext),
  ...React.useContext(NotificationContext),
  viewportWidth: useViewportWidth(),
  deckId: useRouteMatch().params.deckId,
}))(props => <DeckEditorView {...props} />)
