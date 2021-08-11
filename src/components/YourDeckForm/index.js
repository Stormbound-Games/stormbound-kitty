import React from 'react'
import CTA from '../CTA'
import Input from '../Input'
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
          <Input
            label='Deck URL or ID'
            required
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
          <Input
            label='Deck name'
            required
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
          <TagsSelect
            label='Deck tags'
            tags={tags}
            updateTags={updateTags}
            required
            id='deck-tags'
            name='deck-tags'
          />
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
        <Row.Column extend={{ justifyContent: 'center' }}>
          <button type='button' onClick={props.cancel} className='ButtonAsLink'>
            Nevermind
          </button>
        </Row.Column>
      </Row>
    </form>
  )
})
