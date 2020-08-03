import React from 'react'
import { NotificationContext } from '../NotificationProvider'
import cards from '../../data/cards'

export const CollectionContext = React.createContext([])
const cardsWithoutTokens = cards.filter(card => !card.token)

// Note that it is important not to check the status (whether missing or not) in
// that condition because due to a bug introduced when Rogue Sheep was added to
// the game, some locally-stored default collections have all cards level 1,
// with 0 copies, but with Rogue Sheep marked as missing.
const isDefaultCollection = collection =>
  collection.every(card => card.level === 1 && card.copies === 0)

const normaliseCard = card => ({
  id: card.id,
  level: +card.level || 1,
  missing: !!card.missing,
  copies: typeof card.copies === 'undefined' ? 0 : +card.copies,
})

const normaliseCollection = collection =>
  collection.filter(card => !card.token).map(normaliseCard)

const DEFAULT_COLLECTION = normaliseCollection(cards)
const STORAGE_KEY = 'sk.collection'

export default function CollectionProvider(props) {
  const [collection, setCollection] = React.useState(DEFAULT_COLLECTION)
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'books', children: message }),
    [sendNotification]
  )

  React.useEffect(() => {
    try {
      let savedCollection = JSON.parse(localStorage.getItem(STORAGE_KEY))

      // Default collections used to be locally saved but this is no longer the
      // case so if the collection is a default one, remove it from storage.
      if (isDefaultCollection(savedCollection)) {
        localStorage.removeItem(STORAGE_KEY)
      }

      // It is possible that the locally saved collection does not contain all
      // the cards in the game if it was recorded before a card gets added. In
      // such case, we should update the collection with the missing card(s),
      // and mark them as missing.
      else if (savedCollection.length !== cardsWithoutTokens.length) {
        savedCollection = cardsWithoutTokens.map(
          card =>
            savedCollection.find(entry => entry.id === card.id) || {
              id: card.id,
              level: 1,
              missing: true,
              copies: 0,
            }
        )

        setCollection(savedCollection)
        notify('Locally saved collection found and loaded.')
      }
    } catch (error) {}
  }, [notify])

  React.useEffect(() => {
    // If the collection is the default one, remove it from the local storage as
    // this is not only unnecessary, but can also lead to hard-to-track bug
    // where obsolete data get stored (e.g. a default collection of 188 cards
    // before a 189th gets added to the game).
    if (isDefaultCollection(collection)) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
    }
  }, [collection])

  const resetCollection = () => {
    if (
      window.confirm(
        'Are you sure you want to clear your collection? It cannot be undone, so make sure you have exported it to CSV beforehand.'
      )
    ) {
      notify('Local collection cleared and reseted to the default one.')
      localStorage.removeItem(STORAGE_KEY)
      setCollection(DEFAULT_COLLECTION)
    }
  }

  const updateCollection = handler => {
    setCollection(
      normaliseCollection(
        typeof handler === 'function' ? handler(collection) : handler
      )
    )
  }

  return (
    <CollectionContext.Provider
      value={{
        collection: collection,
        hasDefaultCollection: isDefaultCollection(collection),
        resetCollection,
        updateCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  )
}
