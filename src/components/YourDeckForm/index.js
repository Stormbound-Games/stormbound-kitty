import React from 'react'
import { CATEGORIES } from '../../constants/decks'
import Column from '../Column'
import CTA from '../CTA'
import Row from '../Row'

export default React.memo(function YourDeckForm(props) {
  return (
    <form onSubmit={props.onSubmit} data-testid='deck-form'>
      <Row>
        <Column>
          <label htmlFor='id'>Deck URL or ID</label>
          <input
            readOnly={!!props.id}
            required
            type='text'
            name='id'
            id='id'
            data-testid='deck-id-input'
            defaultValue={props.id}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <label htmlFor='name'>Deck name</label>
          <input
            required
            type='text'
            name='name'
            id='name'
            data-testid='deck-name-input'
            defaultValue={props.name}
          />
        </Column>
        <Column>
          <label htmlFor='category'>Deck category</label>
          <select
            id='category'
            name='category'
            defaultValue={props.category}
            data-testid='deck-category-select'
          >
            {Object.keys(CATEGORIES).map(category => (
              <option value={category} key={category}>
                {CATEGORIES[category]}
              </option>
            ))}
          </select>
        </Column>
      </Row>
      <Row>
        <Column>
          <CTA type='submit' data-testid='deck-submit'>
            {props.id || props.name || props.category
              ? 'Update deck'
              : 'Add deck'}
          </CTA>
        </Column>
        <Column style={{ justifyContent: 'center' }}>
          <button type='button' onClick={props.cancel} className='ButtonAsLink'>
            Nevermind
          </button>
        </Column>
      </Row>
    </form>
  )
})
