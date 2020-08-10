import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import { CollectionContext } from '../CollectionProvider'
import { NotificationContext } from '../NotificationProvider'
import BookmarkDeckButton from '../BookmarkDeckButton'
import CollectionClearHint from '../CollectionClearHint'
import CardLevelField from '../DeckCardLevelField'
import CardsFiltering from '../CardsFiltering'
import CardsGallery from '../CardsGallery'
import Checkbox from '../Checkbox'
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
import serialisation from '../../helpers/serialisation'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

class DeckEditorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // `cardLevel` is set to `0` when the user has a custom collection loaded
      // and expects the card levels to be the ones of the collection. This is
      // done to always have a number (0 for custom levels, 1 to 5 for static
      // levels). Note that this is for the card gallery, and not the cards of
      // the deck itself.
      cardLevel: props.hasDefaultCollection ? 1 : 0,
      cardTooltips: false,
      adjustCardLevels: false,
      // The `originalDeckId` contains the deck ID as loaded from the URL before
      // it gets adjusted to the collection card levels when the user checks the
      // associated checkbox: this is necessary to be able to restore the
      // original deck when the user unchecks said checkbox.
      originalDeckId: null,
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.captureKeyboardEvents)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.captureKeyboardEvents)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.adjustCardLevels && this.state.adjustCardLevels) {
      this.setState({ originalDeckId: this.props.deckId }, () =>
        this.props.history.push('/deck/' + this.getAdjustedDeckId())
      )
    } else if (
      prevState.adjustCardLevels &&
      !this.state.adjustCardLevels &&
      this.state.originalDeckId
    ) {
      this.props.history.push('/deck/' + this.state.originalDeckId)
    }
  }

  getAdjustedDeckId = (collection = this.props.collection) => {
    if (this.props.hasDefaultCollection) return this.props.deckId

    const resolveCard = ({ id }) => {
      const { level, missing } = collection.find(card => card.id === id)
      return missing ? null : { id, level }
    }

    return serialisation.deck.serialise(
      this.props.deck.map(resolveCard).filter(Boolean)
    )
  }

  captureKeyboardEvents = event => {
    const key = event.which
    const keys = [49, 50, 51, 52, 53]
    const padKeys = [97, 98, 99, 100, 101]

    if (keys.includes(key) || padKeys.includes(key)) {
      const level = Math.max(keys.indexOf(key), padKeys.indexOf(key))
      this.setCardLevel(level + 1)
    } else if ([48, 96].includes(key) && !this.props.hasDefaultCollection) {
      this.setCardLevel(0)
    }
  }

  setCardLevel = cardLevel => this.setState({ cardLevel })

  addCardToDeck = id => {
    if (this.isCardMissing(id)) {
      return
    }
    const level =
      this.state.cardLevel === 0 && !this.props.hasDefaultCollection
        ? this.props.collection.find(card => card.id === id).level
        : +this.state.cardLevel

    this.props.addCardToDeck({ id, level })
  }

  isCardMissing = id =>
    this.props.collection.find(card => card.id === id).missing

  onCollectionImport = collection => {
    if (!collection) return

    // When importing a custom collection, set the card levels in the gallery to
    // the ones from the collection.
    this.setCardLevel(0)

    // If the ongoing deck should be adjusted to the collection, loading the
    // collection should reflect that.
    if (this.props.deckId && this.state.adjustCardLevels) {
      this.props.history.push('/deck/' + this.getAdjustedDeckId(collection))
    }
  }

  render() {
    const matchedDeck = isSuggestedDeck(this.props.deck)
    const cardCollection = this.props.collection.map(card =>
      getResolvedCardData({
        ...card,
        level:
          this.state.cardLevel === 0 && !this.props.hasDefaultCollection
            ? card.level
            : this.state.cardLevel,
      })
    )
    const deck =
      matchedDeck && matchedDeck.brawl
        ? modifyDeck(this.props.deck, matchedDeck.brawl)
        : this.props.deck
    const adjustedDeckId = this.getAdjustedDeckId()

    return (
      <>
        <h1 className='VisuallyHidden'>Deck Builder</h1>

        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <div className='DeckEditorView__header'>
              <Title>{matchedDeck ? matchedDeck.name : 'Your deck'}</Title>

              {matchedDeck && (
                <p className='DeckEditorView__subtitle'>
                  (by{' '}
                  <Link to={`/member/${matchedDeck.author}`}>
                    {matchedDeck.author}
                  </Link>
                  )
                </p>
              )}

              {deck.length === 12 && (
                <BookmarkDeckButton
                  className='DeckEditorView__bookmark'
                  id={serialisation.deck.serialise(deck)}
                  {...matchedDeck}
                />
              )}
            </div>

            <Deck
              showUpgrades
              showTooltips={this.state.cardTooltips}
              id='deck'
              deck={deck}
              orientation={
                this.props.viewportWidth >= 700 ? 'vertical' : 'horizontal'
              }
              onClick={this.props.removeCardFromDeck}
              onClickLabel='Remove card from deck'
              highlightedCards={this.props.highlightedCards}
            />

            <Only.Desktop>
              {this.props.deckId && (
                <Checkbox
                  className='DeckEditorView__checkbox'
                  onChange={event =>
                    this.setState({ cardTooltips: event.target.checked })
                  }
                  name='card-tooltips'
                  id='card-tooltips'
                  checked={this.state.cardTooltips}
                >
                  Enable card tooltips on hover
                </Checkbox>
              )}
            </Only.Desktop>
            <Only.CustomCollection>
              {(this.props.deckId !== adjustedDeckId ||
                this.state.adjustCardLevels) && (
                <Checkbox
                  className='DeckEditorView__checkbox'
                  onChange={event =>
                    this.setState({ adjustCardLevels: event.target.checked })
                  }
                  name='adjust-card-levels'
                  id='adjust-card-levels'
                  checked={this.state.adjustCardLevels}
                >
                  Adjust card levels to collection
                </Checkbox>
              )}
            </Only.CustomCollection>

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
                          <CardLevelField
                            cardLevel={this.state.cardLevel}
                            setCardLevel={this.setCardLevel}
                          />
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

        <PageMeta {...getDeckBuilderMetaTags(deck, 'Deck Builder')} />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  ...React.useContext(CollectionContext),
  ...React.useContext(NotificationContext),
  viewportWidth: useViewportWidth(),
  deckId: useRouteMatch().params.deckId,
  history: useHistory(),
}))(props => <DeckEditorView {...props} />)
