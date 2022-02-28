import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import serialization from '~/helpers/serialization'
import getInitialDeckData from '~/helpers/getInitialDeckData'
import sortByMana from '~/helpers/sortByMana'
import useNavigator from '~/hooks/useNavigator'
import useQueryParams from '~/hooks/useQueryParams'

const useDeckBuilderPath = (deck, view) => {
  const { mode } = useQueryParams()
  const id = serialization.deck.serialize(deck)

  switch (view) {
    case 'DETAIL':
      return `/deck/${id}/detail` + (mode ? `?mode=${mode}` : '')
    case 'DRY_RUN':
      return `/deck/${id}/dry-run` + (mode ? `?mode=${mode}` : '')
    default:
    case 'EDITOR':
      return `/deck/${id}` + (mode ? `?mode=${mode}` : '')
  }
}

const useDeckBuilder = props => {
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const navigator = useNavigator()
  const [highlightedCards, setHighlightedCards] = React.useState([])
  const [deck, setDeck] = React.useState(props.deck || [])
  const path = useDeckBuilderPath(deck, props.view)

  const reset = React.useCallback(() => setDeck([]), [])

  const addCardToDeck = React.useCallback(
    ({ id, level }) => {
      const cardInDeck = deck.find(card => card.id === id)

      if (cardInDeck) {
        if (cardInDeck.level !== level) {
          setDeck(deck.map(card => (card.id === id ? { id, level } : card)))
        }
      } else if (deck.length < 12) {
        setDeck([...deck, { id, level }].sort(sortByMana(cardsIndex)))
      }
    },
    [cardsIndex, deck]
  )

  const removeCardFromDeck = React.useCallback(
    ({ id }) => setDeck(deck.filter(card => card.id !== id)),
    [deck]
  )

  // eslint-disable-next-line
  React.useEffect(() => navigator.replace(path), [path])

  React.useEffect(
    () =>
      setDeck(props.id ? getInitialDeckData(cardsIndexBySid, props.id) : []),
    [cardsIndexBySid, props.id]
  )

  return {
    deck,
    suggestedDeck: props.suggestedDeck,
    deckId: props.id,
    reset,
    addCardToDeck,
    defineDeck: setDeck,
    removeCardFromDeck,
    highlight: setHighlightedCards,
    highlightedCards,
  }
}

export default useDeckBuilder
