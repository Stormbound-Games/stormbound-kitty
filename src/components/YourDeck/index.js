import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import FeaturedDeck from '../FeaturedDeck'
import YourDeckDeleteButton from '../YourDeckDeleteButton'
import YourDeckForm from '../YourDeckForm'

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
    <FeaturedDeck
      {...props}
      data-testid='personal-deck'
      author={null}
      actions={[
        {
          'aria-label': 'Edit deck',
          onClick: () => props.onEdit(props.uuid),
          icon: 'pencil',
          'data-testid': 'edit-deck-btn',
        },
        <YourDeckDeleteButton delete={() => removeDeck(props.uuid)} />,
      ]}
    />
  )
})
