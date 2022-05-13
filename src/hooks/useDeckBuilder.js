import React from 'react'
import { useRouter } from 'next/router'
import { CardsContext } from '~/components/CardsProvider'
import serialization from '~/helpers/serialization'
import { sortByMana } from '~/helpers/sortCards'
import useRouteId from '~/hooks/useRouteId'
import useDidUpdateEffect from '~/hooks/useDidUpdateEffect'

const getDeckBuilderPath = (deck, view) => {
  const id = serialization.deck.serialize(deck)

  switch (view) {
    case 'DETAIL':
      return `/deck/${id}/detail`
    case 'DRY_RUN':
      const params = new URLSearchParams(window.location.search)
      const mode = params.get('mode')
      return `/deck/${id}/dry-run` + (mode ? `?mode=${mode}` : '')
    default:
    case 'EDITOR':
      return `/deck/${id}`
  }
}

const useDeckBuilder = props => {
  const id = useRouteId()
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const router = useRouter()
  const [highlightedCards, setHighlightedCards] = React.useState([])
  const [deck, setDeck] = React.useState(props.deck || [])

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

  useDidUpdateEffect(() => {
    const path = getDeckBuilderPath(deck, props.view)
    router.replace(path, null, { scroll: false, shallow: true })
  }, [deck, props.view])

  useDidUpdateEffect(() => {
    setDeck(id ? serialization.deck.deserialize(cardsIndexBySid, id) : [])
  }, [cardsIndexBySid, id])

  return {
    deck,
    suggestedDeck: props.suggestedDeck,
    advice: props.advice,
    preset: props.preset,
    reset,
    addCardToDeck,
    defineDeck: setDeck,
    removeCardFromDeck,
    highlight: setHighlightedCards,
    highlightedCards,
  }
}

export default useDeckBuilder
