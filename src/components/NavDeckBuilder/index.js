import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import SubNav from '~/components/SubNav'
import serialization from '~/helpers/serialization'
import useQueryParams from '~/hooks/useQueryParams'

export default React.memo(function NavDeckBuilder(props) {
  const { id } = useQueryParams()
  const { cardsIndexBySid } = React.useContext(CardsContext)
  const deck = React.useMemo(
    () => (id ? serialization.deck.deserialize(cardsIndexBySid, id) : []),
    [cardsIndexBySid, id]
  )
  const hasBigEnoughDeck = deck.length === 12

  return (
    <SubNav
      items={[
        {
          to: id ? `/deck/${id}` : '/deck',
          label: 'Editor',
          isActive: props.active === 'EDITOR',
        },
        hasBigEnoughDeck
          ? {
              to: `/deck/${id}/detail`,
              label: 'Insights',
              isActive: props.active === 'DETAIL',
            }
          : {
              label: 'Insights',
              hint: 'Your deck is not complete',
            },
        hasBigEnoughDeck
          ? {
              to: `/deck/${id}/dry-run`,
              label: 'Practice',
              isActive: props.active === 'DRY_RUN',
            }
          : {
              label: 'Practice',
              hint: 'Your deck is not complete',
            },
      ]}
    />
  )
})
