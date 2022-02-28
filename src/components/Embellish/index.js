import React from 'react'
import iconify from '~/helpers/iconify'
import replaceInString from '~/helpers/replaceInString'
import { CardsContext } from '~/components/CardsProvider'
import CardLink from '~/components/CardLink'

export default React.memo(function Embellish(props) {
  const { cards, cardsIndexByName } = React.useContext(CardsContext)
  const CARDS_RE = React.useMemo(
    () =>
      new RegExp(
        '(' +
          cards
            .filter(card => !card.token)
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
      const { id } = cardsIndexByName[match]
      return id ? <CardLink id={id} key={id + index} /> : match
    }
  )

  return <Component>{content}</Component>
})
