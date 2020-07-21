import React from 'react'
import { NotificationContext } from '../NotificationProvider'
import cards from '../../data/cards'

export const CollectionContext = React.createContext([])
const cardsWithoutTokens = cards.filter(card => !card.token)

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

      if (savedCollection.length > 0) {
        // It is possible that the locally saved collection does not contain all
        // the cards in the game if it was recorded before a card gets added. In
        // such case, we should update the collection with the missing card(s),
        // and mark them as missing.
        if (savedCollection.length !== cardsWithoutTokens.length) {
          savedCollection = cardsWithoutTokens.map(
            card =>
              savedCollection.find(entry => entry.id === card.id) || {
                id: card.id,
                level: 1,
                missing: true,
                copies: 0,
              }
          )
        }

        setCollection(savedCollection)
        notify('Locally saved collection found and loaded.')
      }
    } catch (error) {}
  }, [notify])

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
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
        hasDefaultCollection: collection.every(
          card => card.level === 1 && card.copies === 0
        ),
        resetCollection,
        updateCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  )
}
