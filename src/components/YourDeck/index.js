import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import DiamondButton from '../DiamondButton'
import FeaturedDeck from '../FeaturedDeck'
import YourDeckDeleteButton from '../YourDeckDeleteButton'
import YourDeckForm from '../YourDeckForm'
import './index.css'

export default React.memo(function YourDeck(props) {
  const { removeDeck } = React.useContext(PersonalDecksContext)

  if (props.isEdited) {
    return (
      <YourDeckForm
        onSubmit={props.handleEdit}
        name={props.name}
        category={props.category}
        id={props.id}
        cancel={props.cancelEdit}
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
          <YourDeckDeleteButton delete={() => removeDeck(props.id)} />
        </span>
      </div>
    </div>
  )
})
