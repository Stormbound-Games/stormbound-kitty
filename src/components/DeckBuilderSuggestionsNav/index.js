import React from 'react'
import CTA from '../CTA'
import './index.css'

const DeckBuilderSuggestionsNav = props => (
  <div className='DeckBuilderSuggestionsNav'>
    <CTA
      type='button'
      className='DeckBuilderSuggestionsNav__button'
      onClick={() => props.setActivePage(props.activePage - 1)}
      disabled={props.activePage === 0}
    >
      Previous
    </CTA>

    <CTA
      type='button'
      className='DeckBuilderSuggestionsNav__button'
      onClick={() => props.setActivePage(props.activePage + 1)}
      disabled={
        props.pages.length === 0 || props.activePage === props.pages.length - 1
      }
    >
      Next
    </CTA>
  </div>
)

export default DeckBuilderSuggestionsNav
