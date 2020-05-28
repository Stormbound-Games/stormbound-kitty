import React from 'react'
import WikiLink from '../../components/WikiLink'
import { COMMON_ABBREVIATIONS } from '../../constants/misc'
import cards from '../../data/cards'

const cardTerms = cards
  .filter(card => !card.token)
  .reduce((acc, card) => {
    const short = card.name
      .split(/[\s,-]/g)
      .map(word => word.slice(0, 1))
      .join('')
    if (short.length === 1) return acc
    acc[short] = <WikiLink id={card.id} />
    return acc
  }, {})

export default () => ({
  ...cardTerms,
  ...COMMON_ABBREVIATIONS,
})
