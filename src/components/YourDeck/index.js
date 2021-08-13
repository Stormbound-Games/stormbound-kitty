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
        tags={props.tags}
        id={props.id}
        cancel={props.cancelEdit}
      />
    )
  }

  return (
    <FeaturedDeck
      {...props}
      author={null}
      actions={[
        {
          label: 'Edit deck',
          onClick: () => props.onEdit(props.uuid),
          icon: 'pencil',
          'data-testid': 'edit-deck-btn',
        },
        <YourDeckDeleteButton delete={() => removeDeck(props.uuid)} />,
      ]}
    />
  )
})
