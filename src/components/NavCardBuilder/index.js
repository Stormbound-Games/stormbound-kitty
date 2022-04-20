import React from 'react'
import { useRouter } from 'next/router'
import { CardsContext } from '~/components/CardsProvider'
import CardSelect from '~/components/CardSelect'
import SubNav from '~/components/SubNav'
import track from '~/helpers/track'
import useViewportSize from '~/hooks/useViewportSize'
import useQueryParams from '~/hooks/useQueryParams'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function NavCardBuilder() {
  const { cardsIndex } = React.useContext(CardsContext)
  const isMounted = useIsMounted()
  const { viewportWidth } = useViewportSize()
  const { id } = useQueryParams()
  const router = useRouter()

  return (
    <SubNav
      items={[
        {
          type: 'COMPONENT',
          children: (
            <CardSelect
              hideLabel
              disabled={!isMounted}
              label='Load Card'
              id='card-select'
              name='card-select'
              noBorder={viewportWidth >= 700}
              current={cardsIndex[id]?.id}
              disabledOptions={id ? [id] : undefined}
              onChange={option => {
                track('card_select_navigation', {
                  id: option ? option.value : null,
                })
                router.push(
                  option ? `/card/official/${option.value}` : '/card',
                  null,
                  { scroll: false }
                )
              }}
              withSpells
            />
          ),
        },
      ]}
    />
  )
})
