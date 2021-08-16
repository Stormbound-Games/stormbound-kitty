import React from 'react'
import { useFela } from 'react-fela'
import CardSelect from '../CardSelect'
import getRawCardData from '../../helpers/getRawCardData'
import useViewportSize from '../../hooks/useViewportSize'
import useRouter from '../../hooks/useRouter'
import styles from '../Header/styles'

export default React.memo(function NavCardBuilder(props) {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()
  const { query, history } = useRouter()
  const id = query.id

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
              option
                ? history.push(`/card/${option.value}/display`)
                : history.push('/card')
            }
            withSpells
          />
        </li>
      </ul>
    </nav>
  )
})
