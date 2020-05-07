import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Info from '../Info'
import Only from '../Only'

export default React.memo(function CollectionClearHint(props) {
  const { resetCollection } = React.useContext(CollectionContext)

  return (
    <Only.CustomCollection>
      <Info icon='books' title='Your collection'>
        A locally saved card collection was found and loaded. If you would like
        to remove it and start fresh, you can{' '}
        <button
          type='button'
          onClick={resetCollection}
          className='ButtonAsLink'
        >
          clear the local data
        </button>{' '}
        (you will be asked to confirm).
      </Info>
    </Only.CustomCollection>
  )
})
