import React from 'react'
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
            minLength={3 * 12}
            autoComplete='off'
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
            maxLength={30}
            defaultValue={props.name}
            autoComplete='off'
          />
        </Column>
        <Column>
          <label htmlFor='category'>Deck category</label>
          <input
            type='text'
            id='category'
            name='category'
            defaultValue={props.category}
            data-testid='deck-category-input'
            required
            maxLength={25}
          />
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
