import React from 'react'
import { NotificationContext } from '../NotificationProvider'

export const PersonalDecksContext = React.createContext([])

const STORAGE_KEY = 'sk.personal_decks'

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

  const addDeck = deck =>
    setDecks(decks =>
      decks.map(deck => deck.id).includes(deck.id) ? decks : [...decks, deck]
    )
  const removeDeck = id =>
    setDecks(decks => decks.filter(deck => deck.id !== id))
  const updateDeck = (id, deck) =>
    setDecks(decks => decks.map(d => (d.id === id ? deck : d)))

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
