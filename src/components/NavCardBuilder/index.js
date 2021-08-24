import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '~/components/CardSelect'
import getRawCardData from '~/helpers/getRawCardData'
import useViewportSize from '~/hooks/useViewportSize'
import useQueryParams from '~/hooks/useQueryParams'
import useNavigator from '~/hooks/useNavigator'
import useIsMounted from '~/hooks/useIsMounted'
import styles from '~/components/Header/styles'

export default React.memo(function NavCardBuilder(props) {
  const { css } = useFela()
  const isMounted = useIsMounted()
  const { viewportWidth } = useViewportSize()
  const { id } = useQueryParams()
  const navigator = useNavigator()

  return (
    <nav className={css(styles.nav({ isSubNav: true }))}>
      <ul className={css(styles.list)}>
        <li className={css(styles.item({ isSelect: true }))}>
          <CardSelect
            hideLabel
            disabled={!isMounted}
            label='Load Card'
            id='card-select'
            name='card-select'
            noBorder={viewportWidth >= 700}
            current={getRawCardData(id).id}
            withClear={Boolean(getRawCardData(id).id)}
            disabledOptions={id ? [id] : undefined}
            onChange={option =>
              navigator.push(option ? `/card/${option.value}/display` : '/card')
            }
            withSpells
          />
        </li>
      </ul>
    </nav>
  )
})
