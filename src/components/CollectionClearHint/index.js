import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Icon from '../Icon'

const CollectionClearHint = props => {
  const { hasDefaultCollection, resetCollection } = React.useContext(
    CollectionContext
  )

  if (hasDefaultCollection) return null

  return (
    <p className='CollectionClearHint'>
      <Icon icon='books' /> A locally saved collection was found and loaded. If
      you would like to remove it and start fresh, you can{' '}
      <button type='button' onClick={resetCollection} className='ButtonAsLink'>
        clear the local data
      </button>{' '}
      (you will be asked to confirm).
    </p>
  )
}

export default CollectionClearHint
