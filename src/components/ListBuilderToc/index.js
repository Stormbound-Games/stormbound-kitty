import React from 'react'
import generateId from '../../helpers/generateId'
import { TIER_COLORS } from '../../constants/list'
import './index.css'

export default React.memo(function ListBuilderToc(props) {
  return (
    <>
      <p className='ListBuilderToc__intro'>
        This list features{' '}
        {props.tiers.map(tier => tier.cards.length).reduce((a, b) => a + b, 0)}{' '}
        cards across the following {props.tiers.length} tiers:
      </p>
      <ol className='ListBuilderToc__list'>
        {props.tiers.map((tier, index) => (
          <li key={tier.name + index} style={{ '--color': TIER_COLORS[index] }}>
            <a href={'#' + generateId(tier.name)}>{tier.name}</a> (
            {tier.cards.length} card
            {tier.cards.length === 1 ? '' : 's'})
          </li>
        ))}
      </ol>
    </>
  )
})
