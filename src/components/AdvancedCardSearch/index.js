import React from 'react'
import { useFela } from 'react-fela'
import CTA from '../CTA'
import LearnMoreIcon from '../LearnMoreIcon'
import Input from '../Input'
import Only from '../Only'
import Row from '../Row'

export default React.memo(function AdvancedCardSearch(props) {
  const { css } = useFela()

  return (
    <form onSubmit={props.onSubmit}>
      <Row desktopOnly>
        <Row.Column width='3/4'>
          <Input
            label={
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
              >
                Advanced search <LearnMoreIcon anchor='#advanced-search' />
                <button
                  type='button'
                  onClick={props.cancel}
                  className={'ButtonAsLink ' + css({ marginBottom: '0.5em' })}
                >
                  <Only.Desktop>Back to regular search</Only.Desktop>
                  <Only.Mobile>Regular search</Only.Mobile>
                </button>
              </div>
            }
            type='search'
            name='search'
            id='search'
            value={props.value}
            onChange={event => props.setSearch(event.target.value)}
            placeholder='e.g. is:satyr mana:3+ str:3-'
            data-testid='advanced-search-input'
          />
        </Row.Column>
        <Row.Column width='1/4' extend={{ justifyContent: 'flex-end' }}>
          <span className={css({ marginBottom: '0.2em' })}>
            <CTA type='submit'>Search</CTA>
          </span>
        </Row.Column>
      </Row>
    </form>
  )
})
