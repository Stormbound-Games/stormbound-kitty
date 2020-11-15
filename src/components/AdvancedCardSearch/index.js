import React from 'react'
import CTA from '../CTA'
import LearnMoreIcon from '../LearnMoreIcon'
import Only from '../Only'
import Row from '../Row'

export default React.memo(function AdvancedCardSearch(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <Row desktopOnly>
        <Row.Column width='3/4'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor='search'>
              Advanced search <LearnMoreIcon anchor='#advanced-search' />
            </label>
            <button
              type='button'
              onClick={props.cancel}
              className='ButtonAsLink'
              style={{ marginBottom: '0.5em' }}
            >
              <Only.Desktop>Back to regular search</Only.Desktop>
              <Only.Mobile>Regular search</Only.Mobile>
            </button>
          </div>
          <input
            type='search'
            name='search'
            id='search'
            value={props.value}
            onChange={event => props.setSearch(event.target.value)}
            placeholder='e.g. is:satyr mana:3+ str:3-'
            data-testid='advanced-search-input'
          />
        </Row.Column>
        <Row.Column width='1/4' style={{ justifyContent: 'flex-end' }}>
          <span style={{ marginBottom: '0.2em' }}>
            <CTA type='submit'>Search</CTA>
          </span>
        </Row.Column>
      </Row>
    </form>
  )
})
