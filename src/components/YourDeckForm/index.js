import React from 'react'
import CTA from '~/components/CTA'
import Input from '~/components/Input'
import Link from '~/components/Link'
import Row from '~/components/Row'
import TagsSelect from '~/components/TagsSelect'
import serialization from '~/helpers/serialization'
import getRawCardData from '~/helpers/getRawCardData'
import getDeckIDFromURL from '~/helpers/getDeckIDFromURL'
import { convertToSkId } from '~/helpers/convertDeckId'

const isValidCard = card => Boolean(getRawCardData(card.id).id)
const validateDeckId = id => {
  if (!id) return false

  // This is not an incredibly elegant check to determine whether the id is a
  // SBID or SKID. The thing is, SBIDs are technically valid base64 since they
  // operate within the same character set. However, SBIDs are always lowercase
  // and the chances of a SBID having 0 uppercase are pretty much null, so this
  // is Good Enough™. Anyway, if it’s a SBID, convert it to a SKID and call the
  // function again to check if it’s valid.
  if (/[=+/]/.test(id) || /[A-Z]/.test(id)) {
    return validateDeckId(convertToSkId(id))
  }

  return serialization.deck.deserialize(getDeckIDFromURL(id)).every(isValidCard)
}

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
      <Row withNarrowGutter spacing={{ top: 'LARGE' }}>
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
          <Link onClick={props.cancel}>Nevermind</Link>
        </Row.Column>
      </Row>
    </form>
  )
})
