import React from 'react'
import CTA from '../CTA'
import Row from '../Row'
import TagsSelect from '../TagsSelect'
import serialisation from '../../helpers/serialisation'
import getRawCardData from '../../helpers/getRawCardData'
import getDeckIDFromURL from '../../helpers/getDeckIDFromURL'

const isValidCard = card => Boolean(getRawCardData(card.id).id)
const validateDeckId = id =>
  id && serialisation.deck.deserialise(getDeckIDFromURL(id)).every(isValidCard)

export default React.memo(function YourDeckForm(props) {
  const [deckID, setDeckID] = React.useState(props.id)
  const isIdValid = validateDeckId(deckID)
  const [tags, updateTags] = React.useState(props.tags || [])

  return (
    <form onSubmit={props.onSubmit} data-testid='deck-form'>
      <Row>
        <Row.Column>
          <label htmlFor='id'>Deck URL or ID</label>
          <input
            required
            type='text'
            name='id'
            id='id'
            data-testid='deck-id-input'
            minLength={3 * 12}
            autoComplete='off'
            value={deckID}
            onChange={event => setDeckID(event.target.value)}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <label htmlFor='name'>Deck name</label>
          <input
            required
            type='text'
            name='name'
            id='name'
            data-testid='deck-name-input'
            maxLength={30}
            defaultValue={props.name}
            autoComplete='off'
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <TagsSelect tags={tags} updateTags={updateTags} required />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <CTA
            type='submit'
            data-testid='deck-submit'
            disabled={!isIdValid || tags.length === 0}
            title={isIdValid ? undefined : 'This deck ID is invalid'}
          >
            {props.id || props.name || props.tags ? 'Update deck' : 'Add deck'}
          </CTA>
        </Row.Column>
        <Row.Column style={{ justifyContent: 'center' }}>
          <button type='button' onClick={props.cancel} className='ButtonAsLink'>
            Nevermind
          </button>
        </Row.Column>
      </Row>
    </form>
  )
})
