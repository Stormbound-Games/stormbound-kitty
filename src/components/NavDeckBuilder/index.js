import React from 'react'
import SubNav from '~/components/SubNav'
import serialisation from '~/helpers/serialisation'
import useQueryParams from '~/hooks/useQueryParams'

export default React.memo(function NavDeckBuilder(props) {
  const { id } = useQueryParams()
  const deck = React.useMemo(
    () => (id ? serialisation.deck.deserialise(id) : []),
    [id]
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
              label: 'Insights',
              hint: 'Your deck is not complete',
            },
      ]}
    />
  )
})
