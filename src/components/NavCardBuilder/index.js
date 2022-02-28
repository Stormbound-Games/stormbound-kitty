import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CardSelect from '~/components/CardSelect'
import SubNav from '~/components/SubNav'
import useViewportSize from '~/hooks/useViewportSize'
import useQueryParams from '~/hooks/useQueryParams'
import useNavigator from '~/hooks/useNavigator'
import useIsMounted from '~/hooks/useIsMounted'

export default React.memo(function NavCardBuilder(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const isMounted = useIsMounted()
  const { viewportWidth } = useViewportSize()
  const { id } = useQueryParams()
  const navigator = useNavigator()

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
              withClear={Boolean(cardsIndex[id]?.id)}
              disabledOptions={id ? [id] : undefined}
              onChange={option =>
                navigator.push(
                  option ? `/card/${option.value}/display` : '/card'
                )
              }
              withSpells
            />
          ),
        },
      ]}
    />
  )
})
