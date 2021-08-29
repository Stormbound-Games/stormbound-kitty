import React from 'react'
import { useFela } from 'react-fela'
import CTA from '~/components/CTA'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Link from '~/components/Link'
import Input from '~/components/Input'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'

export default React.memo(function AdvancedCardSearch(props) {
  const { css } = useFela()

  return (
    <form onSubmit={props.onSubmit}>
      <Row isDesktopOnly>
        <Row.Column width='3/4'>
          <Input
            label={
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
              >
                <span>
                  Advanced search <LearnMoreIcon anchor='#advanced-search' />
                </span>
                <Link
                  onClick={props.cancel}
                  extend={{ marginBottom: 'var(--s-smaller)' }}
                >
                  <Only.Desktop>Back to regular search</Only.Desktop>
                  <Only.Mobile>Regular search</Only.Mobile>
                </Link>
              </div>
            }
            type='search'
            id='search'
            value={props.value}
            onChange={event => props.setSearch(event.target.value)}
            placeholder='e.g. is:satyr mana:3+ str:3-'
            data-testid='advanced-search-input'
          />
        </Row.Column>
        <Row.Column width='1/4' extend={{ justifyContent: 'flex-end' }}>
          <Spacing bottom='SMALLEST'>
            <CTA type='submit' isFullWidthOnMobile>
              Search
            </CTA>
          </Spacing>
        </Row.Column>
      </Row>
    </form>
  )
})
