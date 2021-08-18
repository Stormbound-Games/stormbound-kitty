import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '~/components/CardSelect'
import getRawCardData from '~/helpers/getRawCardData'
import useViewportSize from '~/hooks/useViewportSize'
import useNavigator from '~/hooks/useNavigator'
import useQueryParams from '~/hooks/useQueryParams'
import styles from '~/components/Header/styles'

export default React.memo(function NavCardBuilder() {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()
  const { id } = useQueryParams()
  const navigator = useNavigator()

  return (
    <nav className={css(styles.nav({ isSubNav: true }))}>
      <ul className={css(styles.list)}>
        <li className={css(styles.item({ isSelect: true }))}>
          <CardSelect
            hideLabel
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
