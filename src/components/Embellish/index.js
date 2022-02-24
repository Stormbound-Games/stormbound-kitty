import React from 'react'
import iconify from '~/helpers/iconify'
import replaceInString from '~/helpers/replaceInString'
import getRawCardData from '~/helpers/getRawCardData'
import CardLink from '~/components/CardLink'
import cards from '~/data/cards'

const CARDS_RE = new RegExp(
  '(' +
    cards
      .filter(card => !card.token)
      .map(card => card.name)
      .join('|') +
    ')',
  'g'
)

export default React.memo(function Embellish(props) {
  const Component = props.as || React.Fragment
  const content = replaceInString(
    iconify(props.children),
    CARDS_RE,
    (match, index) => {
      const { id } = getRawCardData(match, 'name')
      return id ? <CardLink id={id} key={id + index} /> : match
    }
  )

  return <Component>{content}</Component>
})
