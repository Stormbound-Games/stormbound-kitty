import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import Page from '~/components/Page'
import CollectionClearHint from '~/components/CollectionClearHint'
import CardLevelField from '~/components/DeckCardLevelField'
import CardsFiltering from '~/components/CardsFiltering'
import CardsGallery from '~/components/CardsGallery'
import Checkbox from '~/components/Checkbox'
import Deck from '~/components/Deck'
import EmptySearch from '~/components/EmptySearch'
import Filters from '~/components/DeckEditorFilters'
import ImportCollection from '~/components/ImportCollection'
import Info from '~/components/Info'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Link from '~/components/Link'
import LoadDeck from '~/components/LoadDeck'
import Only from '~/components/Only'
import RandomDeckButton from '~/components/RandomDeckButton'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import ShareButton from '~/components/DeckShareButton'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getDeckBuilderMetaTags from '~/helpers/getDeckBuilderMetaTags'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import indexArray from '~/helpers/indexArray'
import modifyDeck from '~/helpers/modifyDeck'
import serialization from '~/helpers/serialization'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import toSentence from '~/helpers/toSentence'
import usePrevious from '~/hooks/usePrevious'
import useNavigator from '~/hooks/useNavigator'

// The `adjustCardToCollection` function is used to access the card data as it
// exists in the user’s collection. It is therefore only called when there is
// a custom collection.
const adjustCardToCollection =
  indexedCollection =>
  ({ id }) => {
    const { level, missing } = indexedCollection[id]
    return missing ? null : { id, level }
  }

const useModifiedDeck = (brawls, deck, suggestedDeck) => {
  const { cardsIndex } = React.useContext(CardsContext)
  const brawlIds = brawls.map(brawl => brawl.id)

  // In case the deck is in fact a suggested deck, and a brawl deck at that, it
  // should be adjusted to reflect the brawl modifier. This is especially
  // important for mana brawls in order to display the correct card mana cost.
  if (suggestedDeck) {
    const brawl = suggestedDeck.tags.find(tag => brawlIds.includes(tag.slug))
    if (brawl) return modifyDeck(cardsIndex, deck, brawl)
  }

  return deck
}

const usePageProps = (deck, matchedDeck = {}) => {
  matchedDeck = matchedDeck || {}
  const id = serialization.deck.serialize(deck)
  const { decks, addDeck, removeDeck, toggleUnseen } =
    React.useContext(PersonalDecksContext)
  const props = {}

  props.title = matchedDeck.name || 'Create your deck'
  props.author = matchedDeck.author

  if (matchedDeck.tags) {
    props.meta = toSentence(
      matchedDeck.tags.map(tag => tag.name),
      'and'
    )
  } else if (id) {
    props.meta = getFactionFromDeckID(id) + ' deck'
  } else {
    props.meta = 'Add cards to get started'
  }

  // This check is performed on the deck ID instead of its UUID because only
  // bookmarked decks have a UUID; the others do not. To know whether a deck has
  // been bookmarked, we need to see if it exists in the bookmarked collection.
  const bookmark = decks.find(deck => deck.id === id)

  props.action = {
    onClick: () => {
      toggleUnseen(!bookmark)
      bookmark
        ? removeDeck(bookmark.uuid)
        : addDeck({ ...matchedDeck, id: serialization.deck.serialize(deck) })
    },
    children: bookmark ? 'Unbookmark deck' : 'Bookmark deck',
    icon: 'star',
    disabled: deck.length !== 12,
  }

  return props
}

const getStoredTooltipsSetting = () => {
  try {
    return JSON.parse(localStorage.getItem('sk.db.card_tooltips'))
  } catch {
    return false
  }
}

export default React.memo(function DeckEditorView(props) {
  const navigator = useNavigator()
  const deckId = serialization.deck.serialize(props.deck)
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection, indexedCollection, hasDefaultCollection } =
    React.useContext(CollectionContext)
  // `cardLevel` is set to `0` when the user has a custom collection loaded and
  // expects the card levels to be the ones of the collection. This is done to
  // always have a number (0 for custom levels, 1 to 5 for static levels). Note
  // that this is for the card gallery, and not the cards of the deck itself.
  const [cardLevel, setCardLevel] = React.useState(hasDefaultCollection ? 1 : 0)
  const [cardTooltips, setCardTooltips] = React.useState(false)
  const [adjustCardLevels, setAdjustCardLevels] = React.useState(false)
  const previousAdjustCardLevels = usePrevious(adjustCardLevels)
  // The `originalDeckId` contains the deck ID as loaded from the URL before it
  // gets adjusted to the collection card levels when the user checks the
  // associated checkbox: this is necessary to be able to restore the original
  // deck when the user unchecks said checkbox.
  const [originalDeckId, setOriginalDeckId] = React.useState(null)

  React.useEffect(() => setCardTooltips(getStoredTooltipsSetting()), [])

  const captureKeyboardEvents = React.useCallback(
    event => {
      if (event.target.nodeName === 'INPUT') return
      const key = event.which
      const keys = [49, 50, 51, 52, 53]
      const padKeys = [97, 98, 99, 100, 101]

      if (keys.includes(key) || padKeys.includes(key)) {
        const level = Math.max(keys.indexOf(key), padKeys.indexOf(key))
        setCardLevel(level + 1)
      } else if ([48, 96].includes(key) && !hasDefaultCollection) {
        setCardLevel(0)
      }
    },
    [hasDefaultCollection]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', captureKeyboardEvents)
    return () => document.removeEventListener('keydown', captureKeyboardEvents)
  }, [captureKeyboardEvents])

  // Compute the “adjusted deck ID” which is the ID of the deck once the level
  // of cards (or absence of cards in case of missing) is adjusted to the ones
  // of the collection. Therefore, when the collection is the default one, the
  // adjusted deck ID is the same as the deck ID.
  const adjustedDeck = hasDefaultCollection
    ? props.deck
    : props.deck.map(adjustCardToCollection(indexedCollection)).filter(Boolean)
  const adjustedDeckId = hasDefaultCollection
    ? deckId
    : serialization.deck.serialize(adjustedDeck)

  // If the `adjustCardLevels` option is enabled, and the deck ID and adjusted
  // deck ID are different, we need to redirect to the adjusted deck ID path
  // so it loads the correct data.
  const shouldAdjustDeckToCollection =
    adjustCardLevels && deckId && deckId !== adjustedDeckId
  const adjustedRedirectPath = `/deck/${adjustedDeckId}`

  React.useEffect(() => {
    if (shouldAdjustDeckToCollection) {
      setOriginalDeckId(deckId)
      navigator.push(adjustedRedirectPath)
    }
    // There is no need for `history`, `deckId` and `adjustedRedirectPath` to be
    // passed as dependencies.
    // eslint-disable-next-line
  }, [shouldAdjustDeckToCollection])

  // If the `adjustCardLevels` option is turn off, and we have the original deck
  // ID (which we should always have), we can redirect to it to restore the
  // original data.
  const shouldRestoreOriginalDeck =
    previousAdjustCardLevels && !adjustCardLevels && originalDeckId
  const restoredRedirectPath = `/deck/${originalDeckId}`

  React.useEffect(() => {
    if (shouldRestoreOriginalDeck) {
      navigator.push(restoredRedirectPath)
    }
    // There is no need for `navigator` and `restoredRedirectPath` to be passed
    // as dependencies.
    // eslint-disable-next-line
  }, [shouldRestoreOriginalDeck])

  // Compute the card collection and its level based on whether there is in fact
  // a custom collection, and whether the levels should be the ones of the
  // collection.
  const cardCollection = collection.map(card =>
    getResolvedCardData(cardsIndex, {
      ...card,
      level: cardLevel === 0 && !hasDefaultCollection ? card.level : cardLevel,
    })
  )

  const deck = useModifiedDeck(props.brawls, props.deck, props.suggestedDeck)
  const articleProps = usePageProps(deck, props.suggestedDeck)

  return (
    <Page
      {...articleProps}
      {...getDeckBuilderMetaTags(
        cardsIndex,
        deck,
        props.suggestedDeck,
        'Deck Builder'
      )}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Deck</Title>

          <Deck
            showUpgrades={adjustCardLevels}
            showTooltips={cardTooltips}
            id='deck'
            deck={deck}
            orientation='vertical'
            onClick={props.removeCardFromDeck}
            onClickLabel='Remove card from deck'
            highlightedCards={props.highlightedCards}
          />

          {deck.length > 0 ? (
            <>
              <DeckSettings
                canAdjustCardLevels={deckId !== adjustedDeckId}
                adjustCardLevels={adjustCardLevels}
                setAdjustCardLevels={setAdjustCardLevels}
                cardTooltips={cardTooltips}
                setCardTooltips={setCardTooltips}
              />
              <Spacing top={['BASE', 'NONE']} bottom='LARGE'>
                <DeckActions deck={deck} reset={props.reset} />
              </Spacing>
            </>
          ) : (
            <>
              <LoadInfo defineDeck={props.defineDeck} />
              <HelpInfo defineDeck={props.defineDeck} />
            </>
          )}

          <Only.Desktop>
            <CollectionInfo
              onCollectionImport={collection =>
                // When importing a custom collection, set the card levels in
                // the gallery to the ones from the collection (`0`).
                collection ? setCardLevel(0) : undefined
              }
            />
          </Only.Desktop>
        </Row.Column>

        <Row.Column width='2/3'>
          <Title>Cards</Title>

          <CardsFiltering cards={cardCollection}>
            {({ filters, actions, collection, cardsPerPage }) => (
              <>
                <Filters {...filters} {...actions} />

                {collection.length > 0 ? (
                  <Gallery
                    filters={filters}
                    collection={collection}
                    addCardToDeck={props.addCardToDeck}
                    cardsPerPage={cardsPerPage}
                    cardLevel={cardLevel}
                    setCardLevel={setCardLevel}
                    deck={props.deck}
                  />
                ) : (
                  <EmptySearch
                    title='No cards found'
                    resetFilters={actions.resetFilters}
                  />
                )}
              </>
            )}
          </CardsFiltering>
        </Row.Column>
      </Row>
    </Page>
  )
})

const Gallery = React.memo(function Gallery(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const { collection, cardLevel, setCardLevel, addCardToDeck, deck } = props
  const deckIds = deck.map(card => card.id)
  const indexedCollection = React.useMemo(
    () => indexArray(collection),
    [collection]
  )

  const isCardMissing = React.useCallback(
    id => indexedCollection[id].missing,
    [indexedCollection]
  )
  const isCardInDeck = React.useCallback(id => deckIds.includes(id), [deckIds])

  // The `resolveCardLevel` function is used to know at which level to add card
  // to the deck. When the levels are adjusted to the ones of the custom
  // collection (`0`), it reads the level from the collection, otherwise it uses
  // the value of `cardLevel`.
  const resolveCardLevel = React.useCallback(
    id =>
      cardLevel === 0 && !hasDefaultCollection
        ? indexedCollection[id].level
        : +cardLevel,
    [indexedCollection, cardLevel, hasDefaultCollection]
  )

  const onCardClick = id =>
    isCardMissing(id)
      ? undefined
      : addCardToDeck({ id, level: resolveCardLevel(id) })

  return (
    <CardsGallery
      filters={props.filters}
      cards={collection}
      onCardClick={onCardClick}
      cardsPerPage={props.cardsPerPage}
      isCardInDeck={isCardInDeck}
      isCardMissing={isCardMissing}
      navChildren={
        <CardLevelField cardLevel={cardLevel} setCardLevel={setCardLevel} />
      }
    />
  )
})

const DeckActions = React.memo(function DeckActions(props) {
  return (
    <Row>
      <Row.Column>
        <ResetButton
          label='Reset deck'
          confirm='Are you sure you want to reset your deck?'
          reset={props.reset}
        />
      </Row.Column>
      <Row.Column>
        <ShareButton deck={props.deck} />
      </Row.Column>
    </Row>
  )
})

const DeckSettings = React.memo(function DeckSettings(props) {
  return (
    <Spacing bottom='BASE'>
      <Only.Desktop>
        <CardTooltipsCheckbox
          value={props.cardTooltips}
          set={props.setCardTooltips}
        />
      </Only.Desktop>

      {(props.canAdjustCardLevels || props.adjustCardLevels) && (
        <CardLevelsCheckbox
          value={props.adjustCardLevels}
          set={props.setAdjustCardLevels}
        />
      )}
    </Spacing>
  )
})

const CardTooltipsCheckbox = React.memo(function CardTooltipsCheckbox(props) {
  React.useEffect(() => {
    try {
      localStorage.setItem('sk.db.card_tooltips', JSON.stringify(props.value))
    } catch {}
  }, [props.value])

  return (
    <Checkbox
      onChange={event => props.set(event.target.checked)}
      id='card-tooltips'
      checked={props.value}
      extend={{ marginTop: '-1em' }}
    >
      Enable card tooltips on hover
    </Checkbox>
  )
})

const CardLevelsCheckbox = React.memo(function CardLevelsCheckbox(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  if (hasDefaultCollection) return null

  return (
    <Checkbox
      onChange={event => props.set(event.target.checked)}
      id='adjust-card-levels'
      checked={props.value}
    >
      Adjust card levels to collection
    </Checkbox>
  )
})

const LoadInfo = React.memo(function LoadInfo(props) {
  return (
    <Info
      icon='stack'
      title='Load deck from game'
      CTA={<LoadDeck defineDeck={props.defineDeck} />}
    >
      <p>
        If you export a deck via the game, you can load it directly onto the
        site to tweak and experiment with it. Click the “Load deck” button below
        to get started.
      </p>
    </Info>
  )
})

const HelpInfo = React.memo(function HelpInfo(props) {
  return (
    <Info
      icon='stack'
      title='Getting started'
      CTA={<RandomDeckButton defineDeck={props.defineDeck} />}
    >
      <p>
        If you do not know where to start,{' '}
        <Link to='/guides/deck'>read the deck-building guide</Link> to learn how
        to make a viable deck, or try one of the{' '}
        <Link to='/deck/featured'>ready-to-go featured decks</Link>. Or try
        generating a random deck below.{' '}
        <LearnMoreIcon anchor='#random-deck'>
          Learn more about random decks
        </LearnMoreIcon>
      </p>
    </Info>
  )
})

export const CollectionInfo = React.memo(function CollectionInfo(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  if (!hasDefaultCollection) {
    return <CollectionClearHint />
  }

  return (
    <Info
      icon='books'
      title={
        <>
          Your collection
          <LearnMoreIcon anchor='#collection-benefits' />
        </>
      }
      CTA={<ImportCollection onChange={props.onCollectionImport} />}
    >
      <p>
        If you have already created your collection, you can import it directly
        in the deck builder to compose decks that you can make in-game.
      </p>
    </Info>
  )
})
