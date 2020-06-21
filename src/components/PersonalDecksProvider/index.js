import React from 'react'
import { NotificationContext } from '../NotificationProvider'
import serialisation from '../../helpers/serialisation'

export const PersonalDecksContext = React.createContext([])

const STORAGE_KEY = 'sk.personal_decks'

const getFactionFromId = id => {
  if (id.includes('i')) return 'ironclad'
  if (id.includes('s')) return 'swarm'
  if (id.includes('f')) return 'shadowfen'
  if (id.includes('w')) return 'winter'
  return 'neutral'
}

const getCategoryFromId = id => {
  const cards = serialisation.deck.deserialise(id)
  const average =
    cards.map(card => card.level).reduce((a, b) => a + b, 0) / cards.length

  if (average === 1) return 'EQUALS'
  if (average >= 4) return 'DIAMOND_1'
  return 'REGULAR'
}

export default function PersonalDecksProvider(props) {
  const [decks, setDecks] = React.useState([])
  const [isUnseen, toggleUnseen] = React.useState(false)
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'stack', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    try {
      const savedDecks = JSON.parse(localStorage.getItem(STORAGE_KEY))
      if (savedDecks.length > 0) {
        setDecks(savedDecks)
        notify('Locally saved decks found and loaded.')
      }
    } catch (error) {}
  }, [notify])

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
  }, [decks])

  const resetDecks = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your decks? It cannot be undone, so make sure you have exported it to CSV beforehand.'
      )
    ) {
      notify('Local collection cleared and reseted to the default one.')
      localStorage.removeItem(STORAGE_KEY)
      setDecks([])
    }
  }

  const addDeck = deck => {
    if (decks.map(deck => deck.id).includes(deck.id)) {
      return decks
    }

    return setDecks(decks => [
      ...decks,
      {
        id: deck.id,
        name: deck.name || 'Unnamed deck',
        faction: deck.faction || getFactionFromId(deck.id),
        category: deck.category || getCategoryFromId(deck.id),
      },
    ])
  }

  const removeDeck = id =>
    setDecks(decks => decks.filter(deck => deck.id !== id))

  const updateDeck = (id, updatedDeck) =>
    setDecks(decks =>
      decks.map(deck =>
        deck.id === id
          ? {
              ...deck,
              name: updatedDeck.name || deck.name,
              category: updatedDeck.category || deck.category,
            }
          : deck
      )
    )

  return (
    <PersonalDecksContext.Provider
      value={{
        decks,
        setDecks,
        resetDecks,
        addDeck,
        updateDeck,
        removeDeck,
        isUnseen,
        toggleUnseen,
      }}
    >
      {props.children}
    </PersonalDecksContext.Provider>
  )
}
