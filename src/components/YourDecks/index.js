import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import Column from '../Column'
import Row from '../Row'
import YourDeck from '../YourDeck'
import YourDeckForm from '../YourDeckForm'
import YourDeckGhost from '../YourDeckGhost'
import chunk from '../../helpers/chunk'
import './index.css'

const NewDeck = React.memo(function NewDeck(props) {
  return props.mode === 'GHOST' || !!props.editedDeck ? (
    <YourDeckGhost onClick={() => props.setMode('FORM')} />
  ) : (
    <YourDeckForm onSubmit={props.addDeck} />
  )
})

export default React.memo(function YourDecks(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const rows = chunk(decks, 2)

  return (
    <div className='YourDecks'>
      {rows.map((row, index) => (
        <Row desktopOnly wideGutter key={index}>
          <Column>
            <YourDeck
              {...row[0]}
              onEdit={() => props.onEdit(row[0].id)}
              isEdited={row[0].id === props.editedDeck}
              handleEdit={props.editDeck}
            />
          </Column>
          <Column>
            {row[1] ? (
              <YourDeck
                {...row[1]}
                onEdit={() => props.onEdit(row[1].id)}
                isEdited={row[1].id === props.editedDeck}
                handleEdit={props.editDeck}
              />
            ) : (
              <NewDeck
                editedDeck={props.editedDeck}
                mode={props.mode}
                setMode={props.setMode}
                addDeck={props.addDeck}
              />
            )}
          </Column>
        </Row>
      ))}
      {decks.length % 2 === 0 && (
        <Row desktopOnly wideGutter>
          <Column>
            <NewDeck
              editedDeck={props.editedDeck}
              mode={props.mode}
              setMode={props.setMode}
              addDeck={props.addDeck}
            />
          </Column>
          <Column></Column>
        </Row>
      )}
    </div>
  )
})
