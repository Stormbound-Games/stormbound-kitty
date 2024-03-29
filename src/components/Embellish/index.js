import React from 'react'
import iconify from '#helpers/iconify'
import replaceInString from '#helpers/replaceInString'
import { CardsContext } from '#components/CardsProvider'
import CardLink from '#components/CardLink'

export default React.memo(function Embellish(props) {
  const { cards, cardsIndexByName } = React.useContext(CardsContext)
  const CARDS_RE = React.useMemo(
    () =>
      new RegExp(
        '(' +
          cards
            // The point of “embellishing” card names is to provide a link to
            // their official page. Token cards without a concept of leveling
            // (i.e. “pure” tokens) do not have an official page, so they should
            // be excluded.
            .filter(card => !card.withoutLevel)
            .map(card => card.name)
            .join('|') +
          ')',
        'g'
      ),
    [cards]
  )
  const Component = props.as || React.Fragment
  const content = replaceInString(
    iconify(props.children),
    CARDS_RE,
    (match, index) => {
      const card = cardsIndexByName[match]
      return card ? <CardLink id={card.id} key={card.id + index} /> : match
    }
  )

  return <Component>{content}</Component>
})
