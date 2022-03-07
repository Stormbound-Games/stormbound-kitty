import React from 'react'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import FeaturedDeck from '~/components/FeaturedDeck'
import YourDeckDeleteButton from '~/components/YourDeckDeleteButton'
import YourDeckForm from '~/components/YourDeckForm'

export default React.memo(function YourDeck(props) {
  const { removeDeck } = React.useContext(PersonalDecksContext)

  if (props.isEdited) {
    return (
      <YourDeckForm
        availableTags={props.availableTags}
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
        <YourDeckDeleteButton
          key='remove-deck-btn'
          delete={() => removeDeck(props.uuid)}
        />,
      ]}
      spacing={{ bottom: 'SMALL' }}
    />
  )
})
