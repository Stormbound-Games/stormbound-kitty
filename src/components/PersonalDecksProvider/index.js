import React from 'react'
import { NotificationContext } from '../NotificationProvider'
import serialisation from '../../helpers/serialisation'
import uuid from '../../helpers/uuid'

export const PersonalDecksContext = React.createContext([])

const STORAGE_KEY = 'sk.personal_decks'
const ensureUUID = deck => (deck.uuid ? deck : { ...deck, uuid: uuid() })
const resolveTags = deck =>
  // Maintain backward compatibility with the old `category` key.
  deck.tags ? deck : { ...deck, tags: [deck.category], category: undefined }

const getTagsFromId = id => {
  const cards = serialisation.deck.deserialise(id)
  const average =
    cards.map(card => card.level).reduce((a, b) => a + b, 0) / cards.length

  if (average === 1) return ['EQUALS']
  if (average >= 4) return ['HIGH_LEVELS']
  return ['REGULAR']
}

const getInitialDecks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
      .map(ensureUUID)
      .map(resolveTags)
  } catch (error) {
    return []
  }
}

export default function PersonalDecksProvider(props) {
  const [decks, setDecks] = React.useState(getInitialDecks)
  const [isUnseen, toggleUnseen] = React.useState(false)
  const { notify: sendNotification } = React.useContext(NotificationContext)
  const notify = React.useCallback(
    message => sendNotification({ icon: 'stack', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    if (decks.length > 0) {
      notify('Locally saved decks found and loaded.')
    }
    // We only want to run that once on page load if there are decks, so we need
    // to make sure not to pass `decks` as a dependency, otherwise this is going
    // to run every time the decks get updated.
    // eslint-disable-next-line
  }, [notify])

  React.useEffect(() => {
    if (decks.length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    }
  }, [decks])

  const resetDecks = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your decks? It cannot be undone, so make sure you have exported it to CSV beforehand.'
      )
    ) {
      notify('Local collection cleared and reseted to the default one.')
      setDecks([])
    }
  }

  const addDeck = deck => {
    // This check is effectively performed on the deck ID and not the UUID
    // because this is about preventing the same deck from being added twice.
    if (decks.map(deck => deck.id).includes(deck.id)) {
      return decks
    }

    return setDecks(decks => [
      ...decks,
      {
        uuid: deck.uuid || uuid(),
        id: deck.id,
        name: deck.name || 'Unnamed deck',
        tags:
          deck.tags && deck.tags.length > 0
            ? deck.tags
            : getTagsFromId(deck.id),
      },
    ])
  }

  const removeDeck = uuid =>
    setDecks(decks => decks.filter(deck => deck.uuid !== uuid))

  const updateDeck = (uuid, updatedDeck) =>
    setDecks(decks =>
      decks.map(deck =>
        deck.uuid === uuid
          ? {
              uuid: deck.uuid,
              id: updatedDeck.id || deck.id,
              name: updatedDeck.name || deck.name,
              tags: updatedDeck.tags || deck.tags,
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
