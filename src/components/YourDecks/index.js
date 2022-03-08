import React from 'react'
import Row from '~/components/Row'
import YourDeck from '~/components/YourDeck'
import YourDeckForm from '~/components/YourDeckForm'
import YourDeckGhost from '~/components/YourDeckGhost'
import chunk from '~/helpers/chunk'

const NewDeck = React.memo(function NewDeck(props) {
  return props.mode === 'INITIAL' || !!props.editedDeckUUID ? (
    <YourDeckGhost onClick={() => props.setMode('FORM')} />
  ) : (
    <YourDeckForm
      availableTags={props.availableTags}
      onSubmit={props.addDeck}
      cancel={props.cancel}
    />
  )
})

export default React.memo(function YourDecks(props) {
  const rows = chunk(props.decks, 2)

  return (
    <>
      {rows.map(row => (
        <Row isDesktopOnly key={row.map(deck => deck.id).join('+')}>
          <Row.Column>
            <YourDeck
              {...row[0]}
              onEdit={() => props.onEdit(row[0].uuid)}
              isEdited={row[0].uuid === props.editedDeckUUID}
              handleEdit={props.editDeck}
              cancelEdit={props.disabledEditor}
            />
          </Row.Column>
          <Row.Column>
            {row[1] ? (
              <YourDeck
                {...row[1]}
                onEdit={() => props.onEdit(row[1].uuid)}
                isEdited={row[1].uuid === props.editedDeckUUID}
                handleEdit={props.editDeck}
                cancelEdit={props.disabledEditor}
              />
            ) : (
              <NewDeck
                editedDeckUUID={props.editedDeckUUID}
                mode={props.mode}
                setMode={props.setMode}
                addDeck={props.addDeck}
                cancel={props.disabledEditor}
                availableTags={props.availableTags}
              />
            )}
          </Row.Column>
        </Row>
      ))}

      {props.decks.length % 2 === 0 && (
        <Row isDesktopOnly>
          <Row.Column>
            <NewDeck
              editedDeckUUID={props.editedDeckUUID}
              mode={props.mode}
              setMode={props.setMode}
              addDeck={props.addDeck}
              cancel={props.disabledEditor}
            />
          </Row.Column>
          <Row.Column />
        </Row>
      )}
    </>
  )
})
