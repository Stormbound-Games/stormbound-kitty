import React from 'react'
import CTA from '../CTA'
import './index.css'

const EmptySearch = props => (
  <div className="EmptySearch">
    <img
      className="EmptySearch__image"
      src="/assets/images/cards/faun_companions.png"
      alt="Faun Companions"
    />
    <span className="EmptySearch__title">
      {props.title || 'No results found'}
    </span>
    <p className="EmptySearch__copy">
      It looks like there are no results for your search… Try adjusting your
      search parameters, or reset all filters and try again.
    </p>
    <CTA type="button" onClick={props.resetFilters}>
      Reset filters
    </CTA>
  </div>
)

export default EmptySearch
