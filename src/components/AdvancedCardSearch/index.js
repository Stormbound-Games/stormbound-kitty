import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import Row from '../Row'

export default React.memo(function AdvancedCardSearch(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <Row desktopOnly>
        <Column width='3/4'>
          <label htmlFor='search'>Advanced search</label>
          <input
            type='search'
            name='search'
            id='search'
            value={props.value}
            onChange={event => props.setSearch(event.target.value)}
            placeholder='e.g. is:satyr mana:3+ str:3-'
            data-testid='advanced-search-input'
          />
        </Column>
        <Column width='1/4' style={{ justifyContent: 'center' }}>
          <CTA type='submit'>Search</CTA>
        </Column>
      </Row>
    </form>
  )
})
