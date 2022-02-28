import React from 'react'
import indexArray from '~/helpers/indexArray'

export const CardsContext = React.createContext({ cards: [], index: {} })

export default React.memo(function CardsProvider({ children, cards = [] }) {
  const cardsIndex = React.useMemo(() => indexArray(cards), [cards])
  const cardsIndexByName = React.useMemo(
    () => indexArray(cards, 'name'),
    [cards]
  )
  const cardsIndexBySid = React.useMemo(() => indexArray(cards, 'sid'), [cards])

  return (
    <CardsContext.Provider
      value={{ cards, cardsIndex, cardsIndexByName, cardsIndexBySid }}
    >
      {children}
    </CardsContext.Provider>
  )
})
