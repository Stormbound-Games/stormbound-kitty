import React from 'react'
import CTA from '../CTA'
import Image from '../Image'
import './index.css'

export default React.memo(function EmptySearch(props) {
  return (
    <div className='EmptySearch'>
      <Image
        className='EmptySearch__image'
        src='/assets/images/cards/sweetcap_kittens.png'
      />
      <span className='EmptySearch__title'>
        {props.title || 'No results found'}
      </span>
      <p className='EmptySearch__copy'>
        It looks like there are no results for your search… Try adjusting your
        search parameters, or reset all filters and try again.
      </p>
      <CTA type='button' onClick={props.resetFilters}>
        Reset filters
      </CTA>
    </div>
  )
})
