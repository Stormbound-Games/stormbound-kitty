import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'
import FeaturedDeck from '../FeaturedDeck'
import YourDeckForm from '../YourDeckForm'
import './index.css'

export default React.memo(function YourDeck(props) {
  const { removeDeck } = React.useContext(PersonalDecksContext)
  const handleDelete = React.useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to delete that deck? It cannot be undone.'
      )
    ) {
      removeDeck(props.id)
    }
  }, [props.id, removeDeck])

  if (props.isEdited) {
    return (
      <YourDeckForm
        onSubmit={props.handleEdit}
        name={props.name}
        category={props.category}
        id={props.id}
      />
    )
  }

  return (
    <div className='YourDeck' data-testid='personal-deck'>
      <FeaturedDeck {...props} author={null} />
      <div className='YourDeck__actions'>
        <span className='YourDeck__button'>
          <DiamondButton
            aria-label='Edit deck'
            onClick={() => props.onEdit(props.id)}
            icon='pencil'
            data-testid='edit-deck-btn'
          />
        </span>
        <span className='YourDeck__button'>
          <DiamondButton
            aria-label='Delete deck'
            onClick={handleDelete}
            icon='bin'
            data-testid='delete-deck-btn'
          />
        </span>
      </div>
    </div>
  )
})
