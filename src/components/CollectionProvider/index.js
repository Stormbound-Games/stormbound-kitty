import React from 'react'
import { NotificationContext } from '../NotificationProvider'
import cards from '../../data/cards'

export const CollectionContext = React.createContext([])

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
      const savedCollection = JSON.parse(localStorage.getItem(STORAGE_KEY))
      if (savedCollection.length > 0) {
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
